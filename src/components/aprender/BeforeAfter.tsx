import { X, CheckCircle2, ArrowRight } from "lucide-react";

const before = [
  "Depende do filho, neto ou vizinho pra qualquer coisa no PC",
  "Tem medo de clicar e estragar tudo",
  "Não consegue anexar arquivo nem enviar e-mail sozinho(a)",
  "Sente vergonha de perguntar de novo a mesma coisa",
  "Perde oportunidades por não saber o básico",
];

const after = [
  "Usa o computador sozinho(a), com calma e confiança",
  "Cria documentos no Word e planilhas no Excel do zero",
  "Envia e-mails com anexo, organiza arquivos e pastas",
  "Navega na internet com segurança, sem cair em golpes",
  "Sente orgulho — e ainda ajuda quem sabe menos",
];

export const BeforeAfter = () => (
  <section className="py-6 md:py-10 bg-white">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="text-center mb-5 md:mb-8">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs md:text-sm font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          A transformação real
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
          Como sua vida fica <span className="text-green-600">depois do curso</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-5 items-stretch">
        {/* ANTES */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-slate-300 text-slate-700 text-[11px] font-black uppercase px-2 py-1 rounded">Antes</span>
            <span className="text-slate-500 text-sm font-medium">Como você está hoje</span>
          </div>
          <ul className="space-y-2.5">
            {before.map((t) => (
              <li key={t} className="flex items-start gap-2 text-slate-600 text-sm md:text-base">
                <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" strokeWidth={3} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* seta */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" />

        {/* DEPOIS */}
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-2xl p-4 md:p-6 shadow-lg shadow-green-500/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-600 text-white text-[11px] font-black uppercase px-2 py-1 rounded">Depois</span>
            <span className="text-green-700 text-sm font-bold">Em poucas semanas</span>
          </div>
          <ul className="space-y-2.5">
            {after.map((t) => (
              <li key={t} className="flex items-start gap-2 text-slate-800 text-sm md:text-base font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5 fill-green-100" strokeWidth={2.5} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-slate-600 text-sm md:text-base mt-5 max-w-2xl mx-auto">
        <ArrowRight className="inline w-4 h-4 text-green-600 mr-1" />
        <strong className="text-slate-900">+15.000 alunos</strong> já fizeram essa passagem. Hoje é a sua vez.
      </p>
    </div>
  </section>
);
