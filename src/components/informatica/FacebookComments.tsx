import { ThumbsUp, Heart } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";
import avatar8 from "@/assets/avatar-8.jpg";

export const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar1, avatar3, avatar5, avatar2, avatar4, avatar6];

export const facebookComments = [
  { name: "Luciana M.", text: "Professora maravilhosa! Aprendi em 1 semana o que não consegui em meses 🙌", time: "2 h", likes: 14, hasHeart: true },
  { name: "Tereza S.", text: "Tô conseguindo usar o computador sozinha, muito obrigada! 😍", time: "5 h", likes: 23, hasHeart: false },
  { name: "Carlos A.", text: "Melhor investimento que fiz! Já indiquei pra toda família", time: "1 d", likes: 8, hasHeart: false },
  { name: "Juliana R.", text: "Ganhei uma promoção no trabalho por causa do curso! 🎉", time: "3 d", likes: 31, hasHeart: true },
  { name: "Marcos V.", text: "Achei que era difícil mas a didática é perfeita, parabéns!", time: "1 sem", likes: 12, hasHeart: false },
  { name: "Patrícia S.", text: "Minha mãe de 62 anos aprendeu! Recomendo demais 👏", time: "1 sem", likes: 19, hasHeart: true },
  { name: "Roberto L.", text: "Finalmente consigo fazer planilhas no trabalho. Obrigado! 💪", time: "2 sem", likes: 7, hasHeart: false },
  { name: "Maria G.", text: "Com 68 anos aprendi a mexer no computador. Deus abençoe! 🙏", time: "3 sem", likes: 42, hasHeart: true },
  { name: "Maria H.", text: "Achei que era tarde demais pra aprender. A Elisa provou que eu estava errada! Hoje faço tudo sozinha 😍", time: "4 d", likes: 27, hasHeart: true },
  { name: "Carla E.", text: "Consigo fazer minhas planilhas de controle de estoque. Economizo 3 horas por semana! 📊", time: "1 sem", likes: 16, hasHeart: false },
  { name: "Pedro J.", text: "Ganhei uma promoção porque agora domino Word e Excel. O investimento se pagou em menos de um mês 💰", time: "2 sem", likes: 34, hasHeart: true },
  { name: "Roberta S.", text: "A didática da professora é incrível. Ela explica de um jeito que até quem nunca usou computador entende ❤️", time: "5 d", likes: 21, hasHeart: true },
  { name: "Fernanda C.", text: "Consegui meu primeiro emprego graças ao curso! Fiz meu currículo perfeito 🎉", time: "1 sem", likes: 38, hasHeart: true },
  { name: "José A.", text: "Meus netos não acreditaram quando viram eu usando o computador sozinho. Valeu cada centavo! 🙏", time: "3 sem", likes: 45, hasHeart: true },
];

export const FacebookComment = ({ comment, avatarSrc }: { comment: typeof facebookComments[0]; avatarSrc: string }) => (
  <div className="bg-card rounded-lg p-3 shadow-sm border border-line">
    <div className="flex gap-2">
      <img src={avatarSrc} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 blur-[3px]" />
      <div className="flex-1 min-w-0">
        <div className="bg-secondary rounded-2xl px-3 py-2">
          <p className="text-muted-foreground text-xs font-semibold leading-none mb-1 blur-[3px] select-none">{comment.name}</p>
          <p className="text-muted-foreground text-xs leading-relaxed">{comment.text}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 px-2">
          <span className="text-[11px] text-muted-foreground/60">{comment.time}</span>
          <span className="text-[11px] text-muted-foreground/60 font-medium cursor-pointer hover:underline">Curtir</span>
          <span className="text-[11px] text-muted-foreground/60 font-medium cursor-pointer hover:underline">Responder</span>
          {comment.likes > 0 && (
            <span className="ml-auto text-[11px] text-muted-foreground/60 flex items-center gap-0.5">
              <span className="flex items-center -space-x-1">
                <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center z-10"><ThumbsUp className="w-2.5 h-2.5 text-white fill-white" /></span>
                {comment.hasHeart && <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center z-0"><Heart className="w-2.5 h-2.5 text-white fill-white" /></span>}
              </span>
              {comment.likes}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

interface CommentsStripProps {
  startIndex: number;
  count: number;
}

export const CommentsStrip = ({ startIndex, count }: CommentsStripProps) => {
  const comments = facebookComments.slice(startIndex, startIndex + count);
  return (
    <div className="py-4 md:py-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {comments.map((comment, index) => (
            <FacebookComment key={startIndex + index} comment={comment} avatarSrc={avatarImages[startIndex + index]} />
          ))}
        </div>
      </div>
    </div>
  );
};
