const projects = [
  {
    icon: 'fa-heartbeat',
    name: 'Canada Reference-Free Health Test Finder',
    tech: 'Next.js, React, Vercel',
    desc: 'Conçu pour les francophones du Québec — agrège des centaines d\'examens médicaux auto-payants au Canada et aux États-Unis sans lettre de référence. Recherche par mot-clé, filtres avancés (type de test, région, prix, délai), et fiches complètes avec politiques et restrictions de chaque clinique.',
    href: 'https://ref-free-health.vercel.app/',
    live: true,
  },
  {
    icon: 'fa-brain',
    name: 'CNN Image Classifier',
    tech: 'PyTorch & TensorFlow',
    desc: 'CIFAR-10 classification with hyperparameter tuning, regularization comparison, and confusion matrix analysis. Full LaTeX report included.',
    href: 'https://github.com/yyzhangggg/my_website/tree/main/ml-ai-projects/PyTorch_Tensorflow_CNN',
  },
  {
    icon: 'fa-chart-line',
    name: 'Power Plant Output Prediction',
    tech: 'Python, scikit-learn',
    desc: 'Predicts electrical energy output using Linear Regression vs Random Forest on 4,223 instances. Identifies Temperature as the strongest predictor.',
    href: 'https://github.com/yyzhangggg/my_website/tree/main/ml-ai-projects/ML_modeling_predict_electrical_energy',
  },
  {
    icon: 'fa-comment-dots',
    name: 'NLP: Naive Bayes + BERT',
    tech: 'Python, BERT, Jupyter',
    desc: 'Text classification comparison between classical Naive Bayes and transformer-based BERT approaches.',
    href: 'https://github.com/yyzhangggg/my_website/tree/main/ml-ai-projects/Native_Bayes_BERT',
  },
  {
    icon: 'fa-database',
    name: 'Insurance Data Analytics',
    tech: 'R, SQL, Python',
    desc: 'KNN imputation + logistic regression on a real 70,000+ row insurance dataset. Collaborated with McGill Data Squad.',
    href: 'https://github.com/yyzhangggg/my_website/tree/main/data-analysis/insurance%20textual%20data%20analytics',
  },
  {
    icon: 'fa-microchip',
    name: 'OS Process Scheduler',
    tech: 'C, pthreads, Linux',
    desc: 'Custom shell implementing FCFS, SJF, Round Robin, and Aging scheduling policies with multi-threaded execution via pthreads.',
    href: 'https://github.com/yyzhangggg/my_website/tree/main/os-projects-c/P1-Multi_Process_Scheduling',
  },
  {
    icon: 'fa-chess',
    name: 'Chess Sudoku Solver',
    tech: 'Java',
    desc: 'Multi-constraint puzzle solver integrating chess piece rules (Knight, Queen, King) across 3×3 to 5×5 grids, with a GUI visualizer.',
    href: 'https://github.com/yyzhangggg/my_website/tree/main/java-projects/chess-sudoku-solver',
  },
]

export default function TechProjects() {
  return (
    <section className="wrapper style1" id="tech-projects">
      <div className="z-row">
        <div className="z-label">
          <h2>Technical Projects</h2>
          <p>
            Web Apps &nbsp;·&nbsp; ML / AI &nbsp;·&nbsp; Data Science &nbsp;·&nbsp; Systems Programming
            &nbsp;·&nbsp; Java
          </p>
        </div>
        <div className="z-body">
          <div className="items style1 medium onscroll-fade-in">
            {projects.map((p) => (
              <section key={p.name}>
                <span className={`icon solid style2 major ${p.icon}`} />
                <h3>{p.name}</h3>
                <p>
                  <strong>{p.tech}</strong>
                  <br />
                  {p.desc}
                </p>
                <a
                  href={p.href}
                  className="button small"
                  target="_blank"
                  rel="noreferrer"
                >
                  {p.live ? 'Live Demo' : 'View on GitHub'}
                </a>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
