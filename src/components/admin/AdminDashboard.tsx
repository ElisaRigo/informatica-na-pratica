import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StudentsList } from './StudentsList';
import { AddStudent } from './AddStudent';
import { PaymentsList } from './PaymentsList';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Erro ao sair');
    } else {
      toast.success('Logout realizado com sucesso');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="students">Alunos</TabsTrigger>
            <TabsTrigger value="add">Adicionar Aluno</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <StudentsList />
          </TabsContent>

          <TabsContent value="add">
            <AddStudent />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsList />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
