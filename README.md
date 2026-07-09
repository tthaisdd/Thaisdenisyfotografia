# Site Thais Denisy Fotografia

Site estático mobile-first para bio do Instagram, agendamento por WhatsApp e apresentação dos serviços da fotógrafa.

## O que foi criado

- Página inicial moderna em tons de marrom.
- Slogan: “Momentos eternos, memórias vivas.”
- Sobre mim com espaço para foto da fotógrafa.
- Área de planos e serviços editável.
- Portfólio/melhores trabalhos com fotos editáveis.
- Feedbacks editáveis.
- Dúvidas comuns editáveis.
- Formulário de agendamento que direciona para WhatsApp.
- WhatsApp configurado: https://wa.me/5516994137996
- Painel da fotógrafa na barra de cima.
- Senha do painel: Thais2026

## Como acessar o painel

No site publicado, clique em “Área da fotógrafa” na barra superior.

Também é possível abrir direto colocando no final do link:

```
#painel
```

Exemplo:

```
https://seusite.netlify.app/#painel
```

## Importante sobre as edições

Este projeto funciona como site estático para GitHub + Netlify. O painel salva as alterações no navegador usando `localStorage`.

Isso significa:

- As alterações ficam salvas no aparelho/navegador onde você editou.
- Para manter um backup, use o botão “Exportar JSON” no painel.
- Para carregar o mesmo conteúdo em outro navegador, use “Importar JSON”.
- Para as alterações aparecerem automaticamente para todos os visitantes, será necessário conectar um CMS/banco de dados, como Decap CMS, Firebase, Supabase ou outro painel com login real.

## Fotos

No painel você pode:

1. Colar o link/caminho de uma imagem.
2. Escolher uma foto do computador para testar no navegador.

Para publicar no GitHub/Netlify, o mais recomendado é criar uma pasta chamada `imagens`, colocar suas fotos nela e usar caminhos como:

```
imagens/thais.jpg
imagens/gestante-01.jpg
imagens/corporativo-01.jpg
```

Já deixei a pasta `imagens` criada no projeto.

## Publicar no GitHub + Netlify

### 1. Criar o repositório no GitHub

1. Entre no GitHub.
2. Crie um repositório novo.
3. Envie os arquivos deste projeto para o repositório.
4. Deixe o arquivo `index.html` na raiz do projeto, junto com `styles.css`, `app.js` e `netlify.toml`.

### 2. Publicar no Netlify

1. Entre no Netlify.
2. Clique em “Add new site” ou “Import from Git”.
3. Escolha GitHub.
4. Selecione o repositório do site.
5. Em “Build command”, deixe vazio.
6. Em “Publish directory”, coloque:

```
.
```

7. Clique em “Deploy site”.

## Arquivos principais

- `index.html` — estrutura do site.
- `styles.css` — visual, cores e responsividade.
- `app.js` — painel editável, WhatsApp e conteúdo dinâmico.
- `netlify.toml` — configuração simples para publicar no Netlify.
- `imagens/` — pasta para colocar suas fotos.
