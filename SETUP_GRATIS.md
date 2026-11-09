# Setup 100% gratuito — passo a passo

Ordem recomendada. Tudo grátis; nenhum passo pede cartão de crédito
(se algum serviço pedir, pare e diga-me — há sempre alternativa).

## Dia 1 — Pôr a landing page no ar (validação começa já)

1. **Email do projeto** — criar Gmail novo, ex.: `babelbee.hello@gmail.com` (se estiver ocupado, escolher outro e alterar `CONTACT_EMAIL` em `site/index.html` e o email em `site/privacy.html`).
2. **Formulário da lista de espera** — tally.so → criar conta com o email do projeto → novo formulário com os 5 campos de `LANDING.md` (secção 10) → Publicar → copiar o link `https://tally.so/r/...`.
3. **Colar o link** em `site/index.html`, na linha `const WAITLIST_URL = "https://tally.so/r/REPLACE_ME";`.
4. **Publicar a landing** — pages.cloudflare.com → criar conta → *Workers & Pages* → *Create* → *Pages* → ligar ao GitHub → escolher `babelbee` → *Build command*: vazio · *Build output directory*: `site` → Deploy.
   Fica em `https://babelbee.pages.dev` (ou parecido, se o nome estiver ocupado).
5. **Começar as publicações** de `LAUNCH_POSTS.md` — uma comunidade por dia.

## Dia 1 — Construção em paralelo

6. Ligar o repositório `babelbee` ao **CTO.new** e enviar o ticket **T0**. Depois T1, T2… um de cada vez.

## Semana 2 — Antes do ticket T6 (pagamentos)

7. **Polar.sh** — criar conta com o email do projeto (login com GitHub) → criar organização "Babelbee" → criar produtos:
   - *Babelbee Pro Monthly* — 9 $/mês, com benefício **License Keys**
   - *Babelbee Pro Yearly* — 79 $/ano, com License Keys
   - *Babelbee Lifetime* — 49 $ pagamento único, com License Keys, limite de 50
   → copiar o **Organization ID** e os links de checkout para o ticket T6.
   (Para receber pagamentos, a Polar pede dados de identidade/banco — normal, e grátis. Comissão só quando vende.)

## Semana 3 — Publicar a extensão (0 €)

8. **Microsoft Edge Add-ons** — partner.microsoft.com → registar como programador de extensões Edge (grátis; pode entrar com conta GitHub pessoal) → submeter o zip gerado por `npm run package`. A revisão demora alguns dias.
9. **Testers do Chrome** — publicar o zip numa *Release* do GitHub (ou enviar diretamente) com instruções: `chrome://extensions` → ativar *Developer mode* → *Load unpacked*.
10. **Chrome Web Store** — só depois da **primeira venda**: pagar os 5 $ de registo com esse dinheiro e publicar o mesmo zip.

## O que NUNCA pagar nesta fase

- Domínio próprio (`.pages.dev` chega para validar; compra-se com as primeiras vendas)
- Anúncios
- Ferramentas de email marketing (Tally + Gmail chegam até ~500 inscritos)
- APIs de IA (o utilizador usa a IA do browser ou a chave grátis dele)
