import { useState } from "react";
import {
  Briefcase, Home, CheckCircle2, ArrowRight, RotateCcw,
  NotebookPen, ShieldCheck, Target, Heart,
} from "lucide-react";
import elisa from "@/assets/elisa-photo.jpg";
import { openHotmartCheckout } from "@/lib/checkoutTracking";

type Profile = "trabalho" | "pessoal";

type Option = { label: string; icon: any; profile: Profile };
type Question = { q: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    q: "Por que você quer aprender informática?",
    options: [
      { label: "Pra conseguir um emprego ou melhorar no meu trabalho", icon: Briefcase, profile: "trabalho" },
      { label: "Pra usar no dia a dia sem depender de ninguém", icon: Home, profile: "pessoal" },
    ],
  },
  {
    q: "O que você mais quer aprender a fazer?",
    options: [
      { label: "Word, Excel e mandar currículo por e-mail", icon: Target, profile: "trabalho" },
      { label: "Mexer no computador, salvar fotos e resolver coisas online", icon: Heart, profile: "pessoal" },
    ],
  },
  {
    q: "Como você se sente hoje na frente do computador?",
    options: [
      { label: "Perdido(a) — e isso tá me atrapalhando profissionalmente", icon: Briefcase, profile: "trabalho" },
      { label: "Com vergonha de pedir ajuda pro filho ou neto toda hora", icon: Home, profile: "pessoal" },
    ],
  },
  {
    q: "O que seria uma vitória pra você depois do curso?",
    options: [
      { label: "Conseguir uma vaga ou uma promoção", icon: Briefcase, profile: "trabalho" },
      { label: "Fazer tudo sozinho(a), com autonomia e confiança", icon: Home, profile: "pessoal" },
    ],
  },
];

const RESULTS: Record<Profile, { title: string; badge: string; message: string; bullets: string[]; cta: string }> = {
  trabalho: {
    badge: "Perfil: Mercado de Trabalho",
    title: "Sim! Esse curso vai te levar aonde você quer chegar 🎯",
    message:
      "Pelas suas respostas, dá pra ver que você tá buscando informática pra abrir portas profissionais — seja pra conseguir uma vaga, uma promoção, ou pra parar de perder oportunidades por não dominar o computador. Fica tranquilo(a), isso é totalmente possível.",
    bullets: [
      "Você vai dominar Word, Excel, e-mail e internet — as ferramentas mais pedidas em qualquer vaga.",
      "Vai aprender a montar currículo, enviar por e-mail e se organizar profissionalmente.",
      "Em poucas semanas você vai estar preparado(a) pra entrevistas e testes básicos de informática.",
    ],
    cta: "Quero me qualificar pro mercado",
  },
  pessoal: {
    badge: "Perfil: Uso Pessoal",
    title: "Que bom! Esse curso foi feito exatamente pra você 💙",
    message:
      "Pelas suas respostas, vejo que você quer conquistar autonomia — parar de depender do filho, do neto, do vizinho pra coisas simples. E olha, você não tá sozinho(a) nessa. A maioria dos meus alunos começou exatamente como você, e hoje faz tudo sem pedir ajuda.",
    bullets: [
      "Você vai aprender no seu ritmo, sem pressa e sem julgamento — do jeito que dá pra entender.",
      "Vai conseguir mandar e-mail, salvar foto, ver banco, marcar médico e resolver a vida online.",
      "Vai ganhar a confiança que você merece pra usar o computador sem medo de estragar nada.",
    ],
    cta: "Quero minha independência digital",
  },
};

export const QuizIdentificacao = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Profile[]>([]);
  const done = step >= QUESTIONS.length;

  const handleAnswer = (profile: Profile) => {
    setAnswers((prev) => [...prev, profile]);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setAnswers([]);
    setStep(0);
  };

  const profile: Profile = (() => {
    const t = answers.filter((a) => a === "trabalho").length;
    const p = answers.filter((a) => a === "pessoal").length;
    return t >= p ? "trabalho" : "pessoal";
  })();

  const result = RESULTS[profile];
  const progress = done ? 100 : Math.round((step / QUESTIONS.length) * 100);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-blue-700">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-6 md:mb-8">
          <span className="flex items-center justify-center gap-3 bg-white text-primary text-xl md:text-3xl font-black px-6 md:px-8 py-3 md:py-4 rounded-full mb-4 shadow-lg w-full">
            <NotebookPen className="w-7 h-7 md:w-9 md:h-9 shrink-0" /> Teste rápido de 30 segundos
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            Descubra se esse curso é <span className="text-white underline decoration-4 decoration-white/40 underline-offset-4">pra você!</span>
          </h2>
          <p className="text-white/90 max-w-xl mx-auto text-sm md:text-base">
            Responda 4 perguntas rápidas e receba uma orientação personalizada da Professora Elisa.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-5 md:p-8">
          {!done && (
            <>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Pergunta {step + 1} de {QUESTIONS.length}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-5 leading-tight">
                {step + 1}. {QUESTIONS[step].q}
              </h3>

              <div className="grid gap-3">
                {QUESTIONS[step].options.map((opt, i) => {
                  const Icon = opt.icon;
                  return (
                  <button
                      key={`q${step}-opt${i}`}
                      onClick={() => handleAnswer(opt.profile)}
                      className="group flex items-center gap-4 text-left bg-white border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl p-4 md:p-5 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-slate-800 font-semibold text-sm md:text-base flex-1">
                        {opt.label}
                      </span>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 shrink-0 transition-colors" />
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {done && (
            <div className="animate-fade-in">
              {/* Teacher header */}
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={elisa}
                  alt="Professora Elisa"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-blue-100 shadow-md"
                />
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Orientação da Professora Elisa</div>
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-black px-2.5 py-1 rounded-full mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {result.badge}
                  </span>
                </div>
              </div>

              <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-tight mb-3">
                {result.title}
              </h3>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-5">
                {result.message}
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 md:p-5 mb-6">
                <div className="text-xs font-black text-blue-700 uppercase tracking-wide mb-3">
                  O que você vai conquistar:
                </div>
                <ul className="space-y-2.5">
                  {result.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm md:text-base">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => openHotmartCheckout()}
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-base md:text-lg py-4 md:py-5 rounded-xl shadow-lg transition-all hover:shadow-xl active:scale-[0.99]"
              >
                {result.cta}
              </button>

              <p className="text-center text-slate-500 text-xs md:text-sm mt-3 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Garantia de 7 dias · Acesso vitalício
              </p>

              <button
                onClick={reset}
                className="mt-5 mx-auto flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Refazer o teste
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
