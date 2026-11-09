# Babelbee — Guia de arranque (custo 0)

**Copiloto multilingue de mensagens para vendedores internacionais de marketplaces.**
O vendedor recebe uma mensagem em qualquer língua → o Babelbee traduz-a para a língua do vendedor
e escreve a resposta perfeita na língua do comprador, com as políticas da loja. Funciona no Etsy, eBay,
Vinted, Depop, Amazon, email — em qualquer site.

Fase 1 do plano: construir rápido, chegar a 300–1000 $/mês de MRR, vender no Acquire/Microns.
Ver `RESEARCH.md` para a validação e o porquê deste posicionamento.

## Posicionamento (o que nos diferencia)

1. **Sem chave de API, sem custos para o utilizador** — IA local do Chrome. Os concorrentes exigem chave OpenAI.
2. **Multilingue de raiz** — para os milhões de vendedores fora dos EUA (a IA nativa do Etsy é só beta nos EUA).
3. **Todas as plataformas numa só extensão** — a IA nativa do Etsy/eBay só funciona dentro de cada um.
4. **Privado e seguro contra banimentos** — nada sai do browser e nunca envia nem automatiza ações.

## Arquitetura de custo zero

| Peça | Solução | Custo |
|---|---|---|
| IA | **Chrome Built-in AI (Gemini Nano, local)** + alternativa **BYOK** (o utilizador cola a sua chave gratuita do Google AI Studio) | 0 € |
| Backend | **Nenhum.** Tudo corre na extensão | 0 € |
| Licenças/pagamentos | **Polar.sh** (open source, license keys validadas diretamente da extensão, trata do IVA mundial). Escolhido em vez do Lemon Squeezy, que foi comprado pela Stripe e tem futuro incerto | 0 € fixo, só % por venda (~5% + 0,50 $) |
| Landing page | **Cloudflare Pages** (`babelbee.pages.dev`, funciona com repositório privado — o GitHub Pages grátis exige repositório público) + formulário Tally | 0 € |
| Email | Gmail novo dedicado (ex.: babelbee.hello@gmail.com) | 0 € |
| Loja | **Microsoft Edge Add-ons** (registo grátis) + zip para testers no Chrome ("Load unpacked") | 0 € |
| Código | GitHub + CTO.new | 0 € |
| CI | GitHub Actions (plano gratuito) | 0 € |

**Chrome Web Store (5 $ uma vez) fica para depois:** lançamos primeiro na Edge Add-ons (grátis, mesmo código) e damos o zip aos testers do Chrome.
Os 5 $ pagam-se com a **primeira pré-venda** (lifetime 49 $). Custo do nosso bolso: **0 €**.

## Decisões importantes

- **Nome "Babelbee"**: Babel (todas as línguas) + bee (vendedor ocupado). Não encontrei nenhuma app/extensão com este nome (pesquisa de 23/10/2026). Confirmar domínio e Chrome Web Store antes de lançar.
- **Nome sem "Etsy"**: usar marcas de terceiros no nome da extensão arrisca rejeição. "for Etsy sellers" só na descrição.
- **Nunca envia mensagens automaticamente** — só insere o texto; o vendedor carrega em "Enviar". Evita problemas com os termos do Etsy/eBay.
- **Menu de contexto como fluxo principal** (selecionar texto → clique direito → "Reply with Babelbee"). Funciona em qualquer site, por isso não parte quando o Etsy muda o HTML, e alarga o mercado (eBay, Amazon, Shopify inbox, email).
- **Sem servidor = sem custos e sem manutenção** → mais valor na venda.

## Como usar com o CTO.new

1. Criar repositório **privado** novo no GitHub: `babelbee`.
2. Colocar lá este `README.md` e o `TICKETS.md`.
3. Ligar o repositório ao CTO.new.
4. Enviar **um ticket de cada vez, por ordem** (T0 → T9). Copiar o bloco inteiro do ticket.
5. Rever cada PR: testar a extensão em `chrome://extensions` → "Load unpacked" → pasta `dist/`.
6. Só fazer merge quando os critérios de aceitação estiverem todos cumpridos.

## Validação em paralelo (enquanto o agente constrói)

- [ ] Ler reviews 1–3★ de extensões concorrentes na Chrome Web Store (pesquisar "etsy reply", "etsy message templates")
- [ ] Recolher frases reais de queixas em r/EtsySellers, r/Etsy, r/Flipping, grupos de Facebook de vendedores
- [ ] Publicar landing page (T8) com lista de espera
- [ ] **Critério para avançar com força:** 30+ inscrições ou 3 pré-vendas

## Preços sugeridos

- **Free:** 15 respostas/mês, 3 modelos
- **Pro:** 9 $/mês ou 79 $/ano — respostas ilimitadas, modelos ilimitados, várias lojas
- **Lifetime de lançamento:** 49 $ (só os primeiros 50 — dá caixa inicial e testemunhos)
