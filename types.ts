// src/types.ts

// DEFINIÇÃO: Interface do Professor (Garante o formato dos dados de quem leciona no reforço)
export interface Professor {
    id: string;          // Identificador único (ex: '1')
    nome: string;        // Nome do professor
    materia: string;     // Disciplina
    foto: string;        // Foto de perfil
}

// DEFINIÇÃO: Interface do Horário (Controla disponibilidade de agendamento em domingos/feriados)
export interface HorarioDisponivel {
    id: string;
    hora: string;        // Ex: "09:00"
    disponivel: boolean; // Prevenção de erro: desabilita clique se indisponível
}

// DEFINIÇÃO: Dados do aluno/responsável autenticado via Biometria
export interface Usuario {
    nomeResponsavel: string;
    nomeAluno: string;
    biometriaAtiva: boolean;
}