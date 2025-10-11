import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

interface Student {
  id: string;
  email: string;
  name: string;
  moodle_username: string | null;
  course_access: boolean;
  created_at: string;
}

export const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStudents(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentId);

      if (error) throw error;

      toast.success('Aluno excluído com sucesso');
      fetchStudents();
    } catch (error: any) {
      toast.error('Erro ao excluir aluno');
    }
  };

  const handleResetPassword = async () => {
    if (!selectedStudent || !newPassword.trim()) {
      toast.error('Digite uma nova senha');
      return;
    }

    try {
      const { error } = await supabase
        .from('students')
        .update({ moodle_password: newPassword })
        .eq('id', selectedStudent);

      if (error) throw error;

      toast.success('Senha redefinida com sucesso');
      setNewPassword('');
      setSelectedStudent(null);
      fetchStudents();
    } catch (error: any) {
      toast.error('Erro ao redefinir senha');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando alunos...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Alunos</CardTitle>
        <CardDescription>
          Total de {students.length} aluno{students.length !== 1 ? 's' : ''} cadastrado{students.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nenhum aluno cadastrado ainda
          </p>
        ) : (
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={student.course_access ? 'default' : 'secondary'}>
                      {student.course_access ? 'Acesso Ativo' : 'Sem Acesso'}
                    </Badge>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedStudent(student.id);
                            setNewPassword('');
                          }}
                        >
                          <KeyRound className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Redefinir Senha</DialogTitle>
                          <DialogDescription>
                            Digite a nova senha do Moodle para {student.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="password">Nova Senha</Label>
                            <Input
                              id="password"
                              type="text"
                              placeholder="Ex: senha nova"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleResetPassword}>
                            Redefinir Senha
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso irá excluir permanentemente o aluno {student.name}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteStudent(student.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                {student.moodle_username && (
                  <p className="text-sm text-muted-foreground">
                    Usuário Moodle: {student.moodle_username}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Cadastrado em: {new Date(student.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
