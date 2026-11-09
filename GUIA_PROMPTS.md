# Guia de cada prompt: o que esperar, como testar, o que pode correr mal

Os tempos são **estimativas**: dependem da carga do CTO.new e da complexidade. Se um prompt demorar
mais de 2–3× o previsto sem PR, vale a pena ver o estado da tarefa no CTO.new.

**Regra geral para pedir correções:** escrever no próprio PR (comentário) ou numa nova tarefa no CTO.new:
```
On PR #[número]: [o que falhou]. Expected: [o que o ticket pede]. Actual: [o que aconteceu]. Error (if any): [colar]. Only fix this; don't change anything else.
```

**Como testar qualquer PR:** separador *Checks* do PR → *Artifacts* → descarregar `dist` → descompactar →
`chrome://extensions` → *Developer mode* → *Load unpacked* (ou *Reload* ↻ se já estava carregada).

---

## T0: Esqueleto do projeto · ⏱️ ~15–40 min · Dificuldade: baixa

**O que faz:** cria a base: build, testes, CI, manifest e ícones. Ainda **não faz nada visível** além do ícone.

**Como testar:**
- CI verde ✅ no PR
- Carregar a extensão: aparece o ícone 🐝 (favo amarelo) na lista de extensões, **sem botão vermelho "Errors"**

**O que pode correr mal → mensagem a enviar:**
| Problema | Mensagem |
|---|---|
| Não há "Artifacts" no PR | `Please make the CI upload the built dist/ folder as an artifact named "dist", as required in T0.` |
| Ícone genérico em vez do favo | `Use the icons from brand/ (icon-16/32/48/128.png) in manifest icons and action.default_icon, copied into dist.` |
| Erro "Manifest file is missing" ao carregar | `Loading dist/ fails: "Manifest file is missing or unreadable". manifest.json must be at the root of dist/.` |
| CI vermelho | `CI is failing on [lint/test/build]. Please fix it; error: [colar a linha vermelha do log].` |

---

## T1: Menu de contexto + painel lateral · ⏱️ ~20–45 min · Dificuldade: baixa

**O que faz:** selecionar texto → clique direito → "Reply with Babelbee" → abre o painel lateral com o texto. A resposta ainda é **texto de exemplo** (a IA vem no T2). **É normal.**

**Como testar:**
- Em qualquer site, selecionar uma frase → clique direito → aparece "Reply with Babelbee"
- O painel abre à direita com a frase lá dentro
- "Generate reply" mostra um texto de exemplo; "Copy" copia-o

**O que pode correr mal:**
| Problema | Mensagem |
|---|---|
| O item aparece mas o painel não abre | `Clicking "Reply with Babelbee" doesn't open the side panel. Note: chrome.sidePanel.open() must be called directly in the contextMenus click handler (user gesture).` |
| O painel abre vazio | `Side panel opens but the selected text is missing. Pass it via chrome.storage.session and read it when the panel loads.` |
| Item aparece sem texto selecionado | `The menu item must only appear when text is selected (contexts: ["selection"]).` |

---

## T2: IA (Chrome built-in + chave Gemini) + tradução · ⏱️ ~45–90 min · Dificuldade: **alta**

**O que faz:** o coração do produto: deteta a língua, traduz, escreve a resposta e a tradução de volta.

**Como testar:**
1. Em `chrome://extensions` → Babelbee → *Details* → *Extension options*: ver a escolha de IA.
2. **Teste A (IA do Chrome):** em Auto, gerar uma resposta. Se o PC suportar, pode aparecer "a descarregar modelo": esperar. Se não suportar, deve aparecer uma mensagem clara a sugerir a chave.
3. **Teste B (chave Gemini):** criar chave grátis em aistudio.google.com → colar nas opções → "Test key" → gerar resposta.
4. Testar com uma mensagem em alemão: ver tradução para português, resposta em alemão, tradução de volta.

**O que pode correr mal:**
| Problema | Mensagem |
|---|---|
| "LanguageModel is not defined" | `Chrome built-in AI is not available on my machine and the extension crashes. It must detect this and fall back to BYOK with a clear message, never crash.` |
| A resposta vem em português em vez da língua do comprador | `The reply must be in the customer's language (German in my test), not the seller's. Only the translation and back-translation are in the seller's language.` |
| Resposta com introdução ("Here is a reply:") | `The output must be the reply only, no preamble or quotes.` |
| A chave aparece nos logs | `The API key must never be logged. Remove any console.log of it.` |

⚠️ **Este é o ticket mais provável de precisar de 2–3 rondas de correção.** É normal.

---

## T3: Perfil da loja · ⏱️ ~20–40 min · Dificuldade: baixa

**Como testar:** preencher o perfil nas opções (ex.: envio 3–5 dias) → fechar e reabrir (os dados ficam) → testar com "Wann kommt meine Bestellung?" → a resposta deve falar em 3–5 dias.

**O que pode correr mal:**
| Problema | Mensagem |
|---|---|
| A IA inventa prazos | `The reply mentioned [X days], but my profile says [Y]. The prompt must instruct the model to use only facts from the shop profile and never invent dates or refunds.` |
| Os dados desaparecem | `Shop profile is not saved after reopening options. Use chrome.storage.sync.` |

---

## T4: Modelos de resposta · ⏱️ ~20–40 min · Dificuldade: baixa

**Como testar:** ver os 7 modelos nas opções → criar, editar, apagar, "reset" → no painel, escolher "Item damaged" e ver a resposta mudar de tom/conteúdo.

**O que pode correr mal:** o modelo escolhido não muda nada →
`Selecting a template doesn't change the reply. Its instructions must be added to the prompt.`

---

## T5: Botão nas páginas do Etsy/eBay/Vinted · ⏱️ ~40–80 min · Dificuldade: **média-alta**

**O que faz:** botão "✨ Babelbee" junto à caixa de resposta. **Nunca carrega em "Enviar".**

**Como testar (precisa de conta de vendedor, ou peça a um vendedor amigo):** abrir uma conversa no Etsy → aparece o botão → clicar → o texto entra na caixa → o botão "Send" do Etsy fica ativo → **você** decide enviar.

**O que pode correr mal:**
| Problema | Mensagem |
|---|---|
| O botão não aparece | `The button doesn't appear on [URL da página, sem dados pessoais]. Selectors may be outdated; please make them more robust and keep them in selectors.ts.` |
| O texto aparece mas "Send" continua cinzento | `Inserted text isn't detected by the site: Send stays disabled. Dispatch input/change events after setting the value (React-controlled textarea).` |

💡 Se for difícil testar, **pode adiar o T5**: o menu de contexto (T1) já funciona em todos os sites. Avançar para o T6 e voltar mais tarde.

---

## T6: Plano grátis + licença Pro (Polar) · ⏱️ ~40–80 min · Dificuldade: média

**Antes:** preencher os `REPLACE_ME` do prompt (passo 7 do `SETUP_GRATIS.md`).

**Como testar:**
- Gerar 15 respostas → a 16.ª mostra "limite atingido" + botão Upgrade
- Upgrade abre o checkout da Polar (não precisa pagar)
- Na Polar, criar um **código de desconto de 100%**, "comprar" o lifetime com ele → recebe chave → colar nas opções → fica Pro
- "Deactivate license" funciona

**O que pode correr mal:**
| Problema | Mensagem |
|---|---|
| Chave válida dá erro | `A valid Polar license key is rejected: [erro]. Check the customer-portal license-keys endpoints and organization_id against current Polar docs.` |
| Pedidos à Polar falham por CORS | `Polar requests fail with a CORS error. Make them from the background service worker and add the Polar API host to host_permissions.` |

---

## T7: Boas-vindas + privacidade · ⏱️ ~15–30 min · Dificuldade: baixa

**Como testar:** remover e reinstalar a extensão → abre uma página de boas-vindas **uma só vez** → confirmar que `manifest.json` não pede permissões a mais (ver `CHECKLIST_REVISAO_PR.md`, secção C).

---

## T8: Landing + textos de loja · ⏱️ ~20–40 min · Dificuldade: baixa

**Antes:** preencher link do Tally e email. A landing já existe em `site/`; o agente só melhora.

**Como testar:** o Cloudflare Pages republica automaticamente após o merge → abrir o site no telemóvel e no PC → botões levam ao Tally → `npm run package` gera o zip para a loja.

---

## T9: Manual de operações · ⏱️ ~20–40 min · Dificuldade: baixa

**Como testar:** ler o `OPERATIONS.md`: consegue perceber como publicar uma nova versão e como transferir o negócio? Se algo não estiver claro, pedir: `Please explain [X] step by step in OPERATIONS.md for a non-developer.`

**Este ficheiro aumenta o valor de venda do negócio**: não o saltar.

---

## Resumo

| Ticket | Tempo estimado | Dificuldade | Precisa de dados seus? |
|---|---|---|---|
| T0 | 15–40 min | Baixa | Não |
| T1 | 20–45 min | Baixa | Não |
| T2 | 45–90 min | **Alta** | Chave Gemini grátis (para testar) |
| T3 | 20–40 min | Baixa | Não |
| T4 | 20–40 min | Baixa | Não |
| T5 | 40–80 min | Média-alta | Conta de vendedor (para testar), adiável |
| T6 | 40–80 min | Média | **Sim:** Polar |
| T7 | 15–30 min | Baixa | Não |
| T8 | 20–40 min | Baixa | **Sim:** Tally + email |
| T9 | 20–40 min | Baixa | Não |

Contando com rondas de correção e as suas revisões, um ritmo realista é **2–3 tickets por dia** →
extensão completa em **cerca de 1–2 semanas**, dentro do plano de 4 semanas.
