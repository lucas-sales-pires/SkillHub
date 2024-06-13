import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },

  {
    path: 'principal',
    loadComponent: () => import('./pages/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.page').then( m => m.QuizPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },

  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'recuperar-senha',
    loadComponent: () => import('./pages/recuperar-senha/recuperar-senha.page').then( m => m.RecuperarSenhaPage)
  },
  {
    path: 'gerenciar-perguntas',
    loadComponent: () => import('./pages/gerenciar-perguntas/gerenciar-perguntas.page').then( m => m.GerenciarPerguntasPage)
  },
  {
    path: 'pagina-pontuacao-quiz',
    loadComponent: () => import('./pages/pagina-pontuacao-quiz/pagina-pontuacao-quiz.page').then( m => m.PaginaPontuacaoQuizPage)
  },
  {
    path: 'pagina-pre-quiz',
    loadComponent: () => import('./pages/pagina-pre-quiz/pagina-pre-quiz.page').then( m => m.PaginaPreQuizPage)
  },
  {
    path: 'acordo',
    loadComponent: () => import('./pages/acordo/acordo.page').then( m => m.AcordoPage)
  },
  {
    path: 'ranking',
    loadComponent: () => import('./pages/ranking/ranking.page').then( m => m.RankingPage)
  },
  {
    path: 'time',
    loadComponent: () => import('./pages/time/time.page').then( m => m.TimePage)
  },
  {
    path: 'administracao',
    loadComponent: () => import('./pages/administracao/administracao.page').then( m => m.AdministracaoPage)
  },
  { path: 'time/cadastro' , loadChildren: () => import('./components/cadastrotime/cadastrotime.component').then( m => m.CadastrotimeComponent) },
  {
    path: 'mensagem-servidor',
    loadComponent: () => import('./pages/mensagem-servidor-usuario/mensagem-servidor.page').then( m => m.MensagemServidorPage)
  },
  {
    path: 'mensagem-servidor-adm',
    loadComponent: () => import('./pages/mensagem-servidor-adm/mensagem-servidor-adm.page').then( m => m.MensagemServidorAdmPage)
  },
  {
    path: 'feedbacks',
    loadComponent: () => import('./pages/feedbacks/feedbacks.page').then( m => m.FeedbacksPage)
  },
  





];
