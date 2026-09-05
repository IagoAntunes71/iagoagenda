# IagoAgenda - Sistema de Agendamento Automático (IHC - A3)

## 📌 Contexto e Problema de Negócio
No reforço escolar, pais e responsáveis buscam agendar aulas de reforço nos finais de semana e feriados. Devido à ausência da equipe de atendimento nesses dias, o **IagoAgenda** resolve esse gargalo através de um autoatendimento responsivo, acessível e sem atrito.

---

## 🎯 Etapa 1: Mapeamento da Vaga
* **Vaga Alvo:** Desenvolvedor Front-end Pleno
* **Framework:** Next.js + TypeScript + Tailwind CSS
* **Foco de IHC:** Acessibilidade (WCAG), Prevenção de Erros (Nielsen) e Touch Targets Mobile.

---

## 🛠️ Checklist de Interação Humano-Computador (IHC)

### 1. Interações Avançadas e Gestos (Touch & Gestures)
* **Swipe:** Implementado o gesto de deslizar para a esquerda/direita para trocar a matéria de estudo.
* **Touch Targets:** Todos os botões possuem altura mínima de `48px` (`h-12`/`h-14`), respeitando a regra do dedo gordo ($\ge 44 \times 44\text{ dp}$).
* **Feedback Tátil:** Integração com a *Web Vibration API* (`navigator.vibrate`) fornecendo feedback físico ao selecionar horários e confirmar agendamentos.

### 2. Biometria e Sensores
* **Autenticação Biométrica:** Simulação de acesso via Face ID / Touch ID para que pais cadastrados acessem dados do aluno com 1 clique.

### 3. Carga Cognitiva & Nielsen
* **Prevenção de Erros:** Horários indisponíveis aparecem desabilitados e tachados, impedindo cliques inválidos.
* **Visibilidade do Status:** Fluxo numérico sequencial (`1. Matéria` $\rightarrow$ `2. Professor` $\rightarrow$ `3. Horário`).

### 4. Acessibilidade (a11y)
* **Contraste WCAG:** Cores de alto contraste entre texto e fundo.
* **Leitores de Tela:** Presença de `aria-label` em todos os elementos clicáveis.

---

## 🧪 Relatório do Teste de Corredor (Usabilidade)
* **Usuário Testado:** Pai de aluno (sem treinamento prévio).
* **Tarefa Executada:** Agendar aula de Matemática para o próximo domingo.
* **Resultado:** O usuário concluiu o agendamento em menos de 30 segundos.
* **Ponto de Atrito Observado:** O usuário tentou clicar direto no horário antes de selecionar o professor.
* **Melhoria Aplicada:** A seção de horários permanece oculta até que o professor seja escolhido, guiando o fluxo de forma natural.