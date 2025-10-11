import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const AddStudent = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    moodle_username: '',
    moodle_password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Criptografa a senha do Moodle antes de salvar
      const { data: encryptedPassword, error: encryptError } = await supabase
        .rpc('encrypt_moodle_password', { password: formData.moodle_password });

      if (encryptError) throw encryptError;

      const { data, error } = await supabase
        .from('students')
        .insert([
          {
            email: formData.email,
            name: formData.name,
            moodle_username: formData.moodle_username,
            moodle_password: encryptedPassword,
            course_access: true,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Aluno cadastrado com sucesso! Senha armazenada de forma segura.');
      
      // Reset form
      setFormData({
        email: '',
        name: '',
        moodle_username: '',
        moodle_password: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Erro ao cadastrar aluno');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Aluno Manualmente</CardTitle>
        <CardDescription>
          Cadastre um novo aluno diretamente no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nome do aluno"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="moodle_username">Usuário Moodle</Label>
            <Input
              id="moodle_username"
              type="text"
              placeholder="usuario_moodle"
              value={formData.moodle_username}
              onChange={(e) => setFormData({ ...formData, moodle_username: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="moodle_password">Senha Moodle</Label>
            <Input
              id="moodle_password"
              type="text"
              placeholder="Senha temporária"
              value={formData.moodle_password}
              onChange={(e) => setFormData({ ...formData, moodle_password: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Aluno'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
