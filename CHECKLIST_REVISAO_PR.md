# Checklist de revisão dos PRs do CTO.new (sem precisar de saber programar)

Usar em **cada** PR antes de fazer merge. Se algum ponto falhar, copiar a mensagem-modelo do fim, preenchê-la e enviá-la ao agente no próprio PR.

---

## A. Verificações rápidas no GitHub (2 minutos)

- [ ] **CI verde:** no PR, os "checks" têm ✅ (não ❌ nem 🟡 a correr)
- [ ] **O PR corresponde a UM ticket:** o título e a descrição falam só do ticket enviado (ex.: T0), sem coisas extra
- [ ] **Ficheiros alterados fazem sentido:** no separador *Files changed*, nada de ficheiros estranhos (ex.: `.env`, chaves, ficheiros enormes, pastas `node_modules` ou `dist`)
- [ ] **Sem segredos:** procurar no *Files changed* (Ctrl+F) por `key`, `secret`, `token`, `password`. Só podem aparecer como nomes de variáveis, nunca com valores reais
- [ ] **README atualizado** se o ticket o pedia

## B. Testar a extensão no browser (5 minutos)

1. No PR, abrir o separador **Checks** → artefacto do build (se existir) → descarregar o zip.
   Se não houver artefacto: pedir ao agente "Please upload the built `dist/` folder as a GitHub Actions artifact on every PR" (é útil fazer isto já no T0).
2. Descompactar.
3. Chrome/Edge → `chrome://extensions` (ou `edge://extensions`) → ativar **Developer mode** → **Load unpacked** → escolher a pasta.
- [ ] A extensão aparece **sem erros** (sem botão vermelho "Errors")
- [ ] Testar cada **critério de aceitação** do ticket, um a um, tal como está escrito no `TICKETS.md`
- [ ] Abrir um site qualquer e confirmar que nada se partiu nesse site

## C. Regras do projeto (ver sempre)

- [ ] **Nunca envia mensagens nem clica em "Enviar"** em nenhum site
- [ ] **Sem servidor:** não aparece código para "deploy" de backend, base de dados paga ou serviços com custos
- [ ] **Permissões mínimas:** no `manifest.json`, só as permissões pedidas nos tickets. Atenção a `<all_urls>`, `tabs`, `history`, `cookies`: se aparecerem sem estarem no ticket, perguntar porquê
- [ ] **Dados:** nada é enviado para fora do browser, exceto Google Gemini (modo BYOK) e Polar (licenças)

## D. Específico do T0

- [ ] Existe `package.json` com os comandos `build`, `lint`, `test`
- [ ] Existe `.github/workflows/` com o CI
- [ ] Existe `manifest.json` com `"manifest_version": 3`
- [ ] Pastas: `src/background`, `src/sidepanel`, `src/options`, `src/content`, `src/lib`
- [ ] Carregar a extensão não dá erros (passo B)

---

## Quando fazer merge

✅ **Tudo verificado** → *Merge pull request* → enviar o ticket seguinte.
❌ **Algo falhou** → não fazer merge, enviar mensagem ao agente:

```
Thanks! Before merging, please fix:

1. [O que falhou] — expected: [o que o ticket pede]. Actual: [o que aconteceu].
2. ...

Keep the changes limited to this ticket. Reply here when it's ready.
```

**Exemplo:**
```
1. Acceptance criterion "Selecting text → right-click → side panel opens" — expected: side panel opens with the text. Actual: the menu item appears but nothing happens; chrome://extensions shows "Errors" on the service worker: [colar o erro].
```

**Dica:** quando aparecer um erro, clicar em "Errors" na página de extensões, copiar o texto e colá-lo na mensagem. O agente resolve muito mais depressa com o erro exato.

---

## Quando me pedir ajuda

Cole aqui no chat: o link do PR (ou a descrição do PR), a lista de ficheiros alterados e o erro, se houver. Eu digo-lhe se pode fazer merge ou o que pedir ao agente.
