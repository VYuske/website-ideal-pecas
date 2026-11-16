# Website Ideal Peças Andradina

Site institucional multipágina e responsivo da **Ideal Peças Andradina**
— distribuidora de peças para caminhões, tratores e máquinas agrícolas.

## Stack
- HTML + CSS + JavaScript vanilla (sem build, sem dependências npm).
- `nginx:alpine` servindo os arquivos estáticos via Docker.

## Rodando com Docker
```bash
# com Docker Compose (porta 8080)
docker compose up --build

# ou diretamente
docker build -t ideal-pecas .
docker run --rm -p 8080:80 ideal-pecas
```
Acesse http://localhost:8080

## Estrutura
```
public/                     # raiz servida pelo nginx
├── index.html
├── pages/{sobre,produtos,trabalhe-conosco,faq}.html
├── styles/main.css
├── scripts/main.js
└── images/{logo,hero,empresa,categorias,parceiros}/
Dockerfile
docker-compose.yml
```

## Destaques
- Home com hero, esteira de fabricantes parceiros e CTAs (WhatsApp, categorias e Mercado Livre).
- Produtos com catálogo em carrossel e seção de compra no Mercado Livre.
- A Empresa, Trabalhe Conosco e FAQ.
- Rodapé com contato, Instagram, Google Maps e Mercado Livre; botão flutuante de WhatsApp.

## Conteúdo
Textos e imagens extraídos da apresentação institucional e do Histórico Institucional (PDF).
Fonte: `~/Documentos/Projetos/website-silvano` (`DESIGN.md`, `DEMANDA.md`,
`ideal_pecas_extracao/`) e `demandas/anexos/arquivos/Historico_Institucional_Ideal_Pecas.pdf`.

## Documentação de implementação
As demandas e o acompanhamento ficam em
`~/Documentos/Projetos/website-silvano/demandas`.
