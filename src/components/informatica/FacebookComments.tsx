import { ThumbsUp, Heart } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";
import avatar8 from "@/assets/avatar-8.jpg";

export const avatarImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

export const facebookComments = [
  { name: "Luciana M.", text: "Professora maravilhosa! Aprendi em 1 semana o que não consegui em meses 🙌", time: "2 h", likes: 14, hasHeart: true },
  { name: "Tereza S.", text: "Tô conseguindo usar o computador sozinha, muito obrigada! 😍", time: "5 h", likes: 23, hasHeart: false },
  { name: "Carlos A.", text: "Melhor investimento que fiz! Já indiquei pra toda família", time: "1 d", likes: 8, hasHeart: false },
  { name: "Juliana R.", text: "Ganhei uma promoção no trabalho por causa do curso! 🎉", time: "3 d", likes: 31, hasHeart: true },
  { name: "Marcos V.", text: "Achei que era difícil mas a didática é perfeita, parabéns!", time: "1 sem", likes: 12, hasHeart: false },
  { name: "Patrícia S.", text: "Minha mãe de 62 anos aprendeu! Recomendo demais 👏", time: "1 sem", likes: 19, hasHeart: true },
  { name: "Roberto L.", text: "Finalmente consigo fazer planilhas no trabalho. Obrigado! 💪", time: "2 sem", likes: 7, hasHeart: false },
  { name: "Maria G.", text: "Com 68 anos aprendi a mexer no computador. Deus abençoe! 🙏", time: "3 sem", likes: 42, hasHeart: true },
];

export const FacebookComment = ({ comment, avatarSrc }: { comment: typeof facebookComments[0]; avatarSrc: string }) => (
  <div className="bg-white rounded-lg p-3 shadow-sm border border-border/50">
    <div className="flex gap-2">
      <img src={avatarSrc} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 blur-[3px]" />
      <div className="flex-1 min-w-0">
        <div className="bg-muted rounded-2xl px-3 py-2">
          <p className="text-foreground text-xs font-semibold leading-none mb-1 blur-[3px] select-none">{comment.name}</p>
          <p className="text-muted-foreground text-xs leading-relaxed">{comment.text}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 px-2">
          <span className="text-[11px] text-muted-foreground">{comment.time}</span>
          <span className="text-[11px] text-muted-foreground font-medium cursor-pointer hover:underline">Curtir</span>
          <span className="text-[11px] text-muted-foreground font-medium cursor-pointer hover:underline">Responder</span>
          {comment.likes > 0 && (
            <span className="ml-auto text-[11px] text-muted-foreground flex items-center gap-0.5">
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
    <div className="py-4 md:py-6 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-${count > 1 ? '2' : '1'} gap-3 max-w-3xl mx-auto`}>
          {comments.map((comment, index) => (
            <FacebookComment key={startIndex + index} comment={comment} avatarSrc={avatarImages[startIndex + index]} />
          ))}
        </div>
      </div>
    </div>
  );
};
