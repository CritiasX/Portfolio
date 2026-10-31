// Your portfolio content lives here. Image paths are relative to public/.
export const profile = {
  name: 'James Roi Tanglao',
  shortName: 'James',
  role: 'Associate Data Engineer',
  company: 'Accenture',
  email: 'tjamesroi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/james-roi-tanglao-1ab47b189/',
  github: 'https://github.com/CritiasX?tab=repositories',
  instagram: 'https://www.instagram.com/jemsroooii/',
}

export const photos = [
  { src: '/photos/james-graduation.jpg', alt: 'James Roi Tanglao in his graduation gown holding his cap', title: 'The person behind the code', label: 'Graduation day', tone: 'sage', position: '50% 35%' },
  { src: '/photos/james-downtime.jpg', alt: 'James seated beneath colorful lanterns at a restaurant', title: 'Life beyond the screen', label: 'Off the clock', tone: 'clay', position: '50% 50%' },
  { src: '/photos/james-moment.jpg', alt: 'James sharing a playful moment with a young child', title: 'The in-between moments', label: 'Everyday things', tone: 'blue', position: '50% 40%' },
]

export const certifications = [
  { issuer: 'Databricks', title: 'Associate Data Engineer' },
]

export const technologies = [
  { name: 'Databricks', mark: '▱', group: 'Data & cloud' },
  { name: 'AWS', mark: 'aws', group: 'Data & cloud' },
  { name: 'Azure', mark: 'A', group: 'Data & cloud' },
  { name: 'Python', mark: 'Py', group: 'Languages' },
  { name: 'Pandas', mark: 'pd', group: 'Data & cloud' },
  { name: 'Matplotlib', mark: '◔', group: 'Data & cloud' },
  { name: 'Streamlit', mark: '◭', group: 'Frameworks' },
  { name: 'Laravel', mark: 'L', group: 'Frameworks' },
  { name: 'Node.js', mark: 'N', group: 'Frameworks' },
  { name: 'PHP', mark: 'php', group: 'Languages' },
  { name: 'JavaScript', mark: 'JS', group: 'Languages' },
  { name: 'C family', mark: 'C', group: 'Languages' },
  { name: 'Java', mark: 'J', group: 'Languages' },
]

export const projects = [
  {
    id: '01', title: 'BulSU InternConnect', category: 'Web application',
    stack: ['Laravel', 'PHP'], theme: 'internconnect', word: 'Connect.',
    description: 'A Laravel project for BulSU. A space for the full story, from the first idea to the finished build.',
    details: 'BulSU InternConnect is one of my Laravel projects. A full walkthrough, project screenshots, and repository link will be added here.',
    status: 'Case study coming soon', image: '', url: '',
  },
  {
    id: '02', title: 'This corner of the internet', category: 'Personal portfolio',
    stack: ['React', 'Three.js', 'Vite'], theme: 'portfolio', word: 'Explore.',
    description: 'Data engineer by day. Creative playground by design. A frontend-only space with a little extra dimension.',
    details: 'This portfolio brings together my work, tools, and interests. Built with React, Vite, and Three.js, it includes interactive 3D scenes, a photo carousel, and a fragrance shelf. It deploys as static files with no backend.',
    status: 'You’re looking at it', image: '', url: '#home',
  },
  {
    id: '03', title: 'Survey Builder', category: 'Web application',
    stack: ['Django', 'Python'], theme: 'survey', word: 'Ask away.',
    description: 'A survey-building project made with Django. The questions are just the beginning.',
    details: 'Survey Builder is my Django project. A closer look at the features, design decisions, screenshots, and source code is coming soon.',
    status: 'Case study coming soon', image: '', url: '',
  },
]
