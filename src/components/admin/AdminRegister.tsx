import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Criar conta
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Fazer login para ter sessão ativa
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) throw signInError;

        // Adicionar role de admin usando função segura
        const { error: roleError } = await supabase.rpc('add_admin_role', {
          user_id: authData.user.id,
          user_role: 'admin'
        });

        if (roleError) throw roleError;

        toast.success('Conta admin criada com sucesso!');
        navigate('/admin');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card p-8 rounded-lg border border-border">
          <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta Admin</h1>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Conta'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Já tem conta? Fazer login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
