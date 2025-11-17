# **App Name**: Workflow Wise

## Core Features:

- Workflow Definition Management: Administradores podem criar, editar e gerenciar definições de workflow (templates) com formulários dinâmicos e etapas de aprovação.
- Dynamic Form Rendering: Renderizar formulários dinamicamente com base nos campos definidos nas definições de workflow, incluindo componentes de texto, textarea, select, date, date-range e upload de arquivos. Inclui validação de campos obrigatórios.
- Workflow Submission: Usuários podem enviar solicitações de workflow, o que cria um novo documento na coleção `workflowRequests`, e quaisquer arquivos anexados nos formulários são enviados para o Firebase Storage no caminho `workflow-attachments/{requestId}/{fieldId}-{fileName}`.
- User Authentication and Authorization: Utilizar o Firebase Authentication para gerenciar usuários, definindo papéis (Colaborador, Gestor, Administrador) e permissões. Gerenciar a atribuição de workflows via e-mail.
- Request Management and Approval Workflow: Gestores podem visualizar e gerenciar solicitações pendentes, responsáveis, alterar status e tomar ações (aprovar/rejeitar/reconhecer) em solicitações de workflow. Um log de auditoria rastreia todas as ações e mudanças de status, criando um histórico de auditoria.
- File Storage and Management: Integração com o Firebase Storage para lidar com uploads de arquivos, organizados em `workflow-attachments/{requestId}/{fieldId}-{fileName}` para fácil acesso.

## Style Guidelines:

- Cor primária: HSL(170, 60%, 50%)
- Cor de fundo: #FFFFFF
- Cor de destaque: hsl(220, 20%, 96%) para elementos interativos e destaques, fornecendo uma dica visual clara para ações.
- Fonte do título: Roboto (Peso 700 - Negrito): Uso: É a fonte principal para títulos e manchetes (font-headline).
- Fonte do corpo: Archivo (Peso 300 - Leve): Uso: É a fonte padrão para o corpo do texto (font-body e font-sans), como descrições, parágrafos e textos de menu.
- Fonte de texto longo: Open Sans (Pesos 400 e 700 - Normal e Negrito): Uso: Utilizada especificamente em contextos onde a legibilidade de textos mais longos é crucial, como o conteúdo de notícias e artigos (por exemplo, na classe font-open-sans).
- Uso consistente de ícones claros e profissionais para ações e status de workflow.
- Layout limpo e organizado com hierarquia clara, facilitando a navegação e a compreensão da interface pelos usuários.
- Animações sutis nas mudanças de status e envios de formulários para fornecer feedback visual.