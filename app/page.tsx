// app/page.tsx
'use client';

import { useState, TouchEvent } from 'react';
import { Professor, HorarioDisponivel, Usuario } from '../types';

const PROFESSORES_MOCK: Professor[] = [
  { id: '1', nome: 'Prof. Ana Silva', materia: 'Matemática', foto: 'https://i.pravatar.cc/150?img=47' },
  { id: '2', nome: 'Prof. Carlos Eduardo', materia: 'Português', foto: 'https://i.pravatar.cc/150?img=12' },
  { id: '3', nome: 'Prof. Roberto Melo', materia: 'Física', foto: 'https://i.pravatar.cc/150?img=33' },
];

const HORARIOS_MOCK: HorarioDisponivel[] = [
  { id: 'h1', hora: '08:00', disponivel: true },
  { id: 'h2', hora: '09:00', disponivel: true },
  { id: 'h3', hora: '10:00', disponivel: false },
  { id: 'h4', hora: '11:00', disponivel: true },
];

export default function PaginaAgendamento() {
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [materiaSelecionada, setMateriaSelecionada] = useState<string>('Matemática');
  const [professorSelecionado, setProfessorSelecionado] = useState<string>('');
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>('');
  const [agendadoSucesso, setAgendadoSucesso] = useState<boolean>(false);

  // ESTADOS PARA CONTROLE DE GESTO DE SWIPE (Touch)
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const materias = ['Matemática', 'Português', 'Física'];

  // REQUISITO IHC: Feedback Tátil/Vibração (Haptic Feedback)
  const emitirFeedbackTatil = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50); // Vibra o celular por 50ms ao interagir
    }
  };

  const simularAutenticacaoBiometrica = () => {
    emitirFeedbackTatil();
    alert('Verificando Biometria / Face ID...');
    setAutenticado(true);
  };

  // REQUISITO IHC: Lógica de Detecção do Gesto SWIPE (Deslizar o dedo)
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    const currentIndex = materias.indexOf(materiaSelecionada);

    if (isLeftSwipe && currentIndex < materias.length - 1) {
      emitirFeedbackTatil();
      setMateriaSelecionada(materias[currentIndex + 1]);
      setProfessorSelecionado('');
      setHorarioSelecionado('');
    }

    if (isRightSwipe && currentIndex > 0) {
      emitirFeedbackTatil();
      setMateriaSelecionada(materias[currentIndex - 1]);
      setProfessorSelecionado('');
      setHorarioSelecionado('');
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
      <main className="max-w-md mx-auto min-h-screen bg-slate-100 p-4 text-slate-900 flex flex-col justify-between">
        <div>
          <header className="mb-6 text-center border-b pb-4 border-slate-200">
            <h1 className="text-2xl font-extrabold text-blue-900">IagoAgenda</h1>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Atendimento Automático de Finais de Semana & Feriados
            </p>
          </header>

          {!autenticado ? (
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center my-8 border border-slate-200">
                <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  👤
                </div>
                <h2 className="text-lg font-bold mb-1">Bem-vindo(a)!</h2>
                <p className="text-sm text-slate-600 mb-6">
                  Acesse sua conta para agendar a aula do seu filho sem precisar aguardar o atendimento.
                </p>
                <button
                    onClick={simularAutenticacaoBiometrica}
                    className="w-full h-14 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                    aria-label="Autenticar usando Biometria ou Face ID"
                >
                  🔒 Entrar com Biometria / Face ID
                </button>
              </div>
          ) : (
              <div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl mb-6">
                  <p className="text-xs text-blue-800 font-semibold">Responsável: Mariana Costa</p>
                  <p className="text-xs text-blue-600">Aluno: Lucas Costa</p>
                </div>

                {agendadoSucesso ? (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center my-6">
                      <span className="text-4xl">🎉</span>
                      <h2 className="text-xl font-bold text-green-900 mt-2">Aula Agendada!</h2>
                      <p className="text-sm text-green-800 mt-2">
                        A aula de <strong>{materiaSelecionada}</strong> com o professor foi confirmada para o próximo domingo às <strong>{horarioSelecionado}</strong>.
                      </p>
                      <button
                          onClick={() => {
                            emitirFeedbackTatil();
                            setAgendadoSucesso(false);
                            setHorarioSelecionado('');
                            setProfessorSelecionado('');
                          }}
                          className="mt-6 text-sm font-bold text-blue-700 underline"
                      >
                        Fazer outro agendamento
                      </button>
                    </div>
                ) : (
                    <>
                      {/* ÁREA COM GESTO DE SWIPE IMPLEMENTADO */}
                      <section className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                            1. Matéria (Deslize para o lado 👈👉)
                          </h2>
                        </div>

                        <div
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            className="flex gap-2 p-1 bg-slate-200 rounded-2xl select-none"
                        >
                          {materias.map((materia) => (
                              <button
                                  key={materia}
                                  onClick={() => {
                                    emitirFeedbackTatil();
                                    setMateriaSelecionada(materia);
                                    setProfessorSelecionado('');
                                    setHorarioSelecionado('');
                                  }}
                                  className={`flex-1 h-12 rounded-xl text-xs font-bold transition-all
                          ${materiaSelecionada === materia
                                      ? 'bg-blue-800 text-white shadow-md scale-105'
                                      : 'bg-transparent text-slate-700 hover:bg-slate-300'}`}
                                  aria-label={`Selecionar matéria ${materia}`}
                              >
                                {materia}
                              </button>
                          ))}
                        </div>
                      </section>

                      <section className="mb-6">
                        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                          2. Professores de {materiaSelecionada}
                        </h2>
                        <div className="space-y-2">
                          {PROFESSORES_MOCK
                              .filter((p) => p.materia === materiaSelecionada)
                              .map((prof) => (
                                  <div
                                      key={prof.id}
                                      onClick={() => {
                                        emitirFeedbackTatil();
                                        setProfessorSelecionado(prof.id);
                                      }}
                                      className={`flex items-center p-3 rounded-xl bg-white border-2 cursor-pointer transition-all h-16
                            ${professorSelecionado === prof.id ? 'border-blue-600 bg-blue-50/30 shadow-sm' : 'border-slate-200'}`}
                                  >
                                    <img src={prof.foto} alt={prof.nome} className="w-10 h-10 rounded-full mr-3 border" />
                                    <span className="font-semibold text-sm text-slate-800">{prof.nome}</span>
                                  </div>
                              ))}
                        </div>
                      </section>

                      {professorSelecionado && (
                          <section className="mb-6">
                            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                              3. Horários no Domingo
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                              {HORARIOS_MOCK.map((item) => (
                                  <button
                                      key={item.id}
                                      disabled={!item.disponivel}
                                      onClick={() => {
                                        emitirFeedbackTatil();
                                        setHorarioSelecionado(item.hora);
                                      }}
                                      className={`h-12 rounded-xl font-bold text-xs transition-all flex items-center justify-center
                            ${!item.disponivel
                                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed line-through border border-slate-300'
                                          : horarioSelecionado === item.hora
                                              ? 'bg-green-600 text-white shadow-md'
                                              : 'bg-white border border-slate-300 text-slate-800 hover:border-green-600'}`}
                                      aria-label={`Horário ${item.hora} ${item.disponivel ? 'disponível' : 'ocupado'}`}
                                  >
                                    {item.hora} {item.disponivel ? '' : '(Ocupado)'}
                                  </button>
                              ))}
                            </div>
                          </section>
                      )}

                      {horarioSelecionado && (
                          <button
                              onClick={() => {
                                emitirFeedbackTatil();
                                setAgendadoSucesso(true);
                              }}
                              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-extrabold rounded-xl shadow-lg transition-transform active:scale-95 text-base mt-4"
                          >
                            Confirmar Agendamento
                          </button>
                      )}
                    </>
                )}
              </div>
          )}
        </div>

        <footer className="text-center text-[10px] text-slate-500 mt-6 pt-4 border-t border-slate-200">
          Projeto A3 - Interação Humano-Computador | IHC 2026
        </footer>
      </main>
  );
}