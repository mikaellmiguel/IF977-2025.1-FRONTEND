# 🚀 Instruções para Build Local

**OBS:** Este projeto está em desenvolvimento. As instruções abaixo guiam a configuração, build, execução e deploy do ambiente frontend.

## 🛠️ Ferramentas Necessárias
Para configurar e desenvolver o projeto, será necessário:
- **Node.js** (versão 18+)
- **NPM** (Node Package Manager)

## ⚙️ Configuração Inicial
### 1. **Clone o repositório**:
```bash
git clone https://github.com/mikaellmiguel/IF977-2025.1-FRONTEND.git
cd IF977-2025.1-FRONTEND
```

### 2. 📦 Instalar Dependências

Após clonar o repositório, você precisará instalar as dependências necessárias para a execução do **frontend**:

1. Navegue até a pasta `frontend/` e instale as dependências com o comando:

```bash
cd frontend
npm install
```

### 3. 🔑 Configuração de Variáveis de Ambiente
Este projeto exige variáveis de ambiente para funcionar corretamente (ex: URL da API, chaves externas). Use o arquivo `.env.example` como referência e crie um `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o `.env` conforme necessário para seu ambiente. Exemplos:

```
VITE_API_URL=https://sua-api.com
VITE_GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
# VITE_PUBLIC_KEY=exemplo-chave-publica
```

### 4. ▶️ Executar o Projeto
Para rodar o frontend em modo desenvolvimento:

```bash
npm run dev
```

Para build de produção:

```bash
npm run build
```

Para preview do build:

```bash
npm run preview
```

## 📈 Status do Projeto
Este projeto está atualmente em fase inicial de desenvolvimento. O código está sendo estruturado e as funcionalidades principais estão sendo implementadas. As instruções de build e deploy serão atualizadas conforme o progresso.