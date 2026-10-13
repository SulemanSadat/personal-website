const cms="/assets/cms.png";
const bot="/assets/bot.jpg";
const automation="/assets/automation.png";
const ariatiles="/assets/ariatiles.png";
const mobileapp="/assets/mobileapp.jpg";
const upworkAccelerator="/assets/upworkAccelerator.png";
const aziziProject="/assets/aziziproject.webp";
const Healthcare="/assets/Healthcare.png";

export const allProjects = [
    {
      id: 8,
      title: 'AZIZI JEWELLERY',
      location: 'Remote, UK',
      description: 'Built and deployed a full-stack gold and jewellery platform featuring secure authentication, appointment booking, WhatsApp integration, dynamic content, and role-based admin management.',
      image: aziziProject,
      category: 'web',
      technologies: ['Next.js', 'TypeScript', 'Laravel 13', 'PostgreSQL', 'Tailwind CSS'],
      live: 'http://azizijewellery.co.uk/',
      featured: true,
    },
    {
      id: 1,
      title: 'Student Management System',
      description: 'Full-Stack Platform for managing student records, students, and grades.',
      image: cms,
      category: 'web',
      technologies: ['React.js', 'CSS', 'Node.js', 'PHP', 'MySQL', 'PHP', 'Figma'],
      github: 'https://github.com/SulemanSadat/Oxford-Student-Portal',
      live: 'https://nationaloxford.com/',
      featured: false
    },
    {
      id: 2,
      title: 'Social Media Video Downloader Bot',
      description: 'Built a cross-platform Telegram media downloader bot that automated social media video downloads, reducing manual processing time by ~90% through instant link-based retrieval',
       image: bot,
      category: 'chatbot',
      technologies: ['Node.js', 'Telegram API', 'Telegraf', 'BotFather', 'PostgreSQL', 'yt-dlp'],
      github: 'https://github.com/SulemanSadat?tab=repositories',
      live: 'https://t.me/media_downloadersbot',
      featured: false
    },
     {
      id: 3,
      title: 'CRM Automation Workflow',
      description: 'Automated lead capture system that collects form submissions, scores leads based on budget, stores them in a CRM database, and sends real-time sales notifications via email and Slack.',
       image: automation ,
      category: 'automation',
      technologies: [ 'n8n', 'OpenAI API', 'Google Sheets', 'Slack', 'Telegram','Gmail API', 'Docker', 'Miro'],
      github: 'https://github.com/SulemanSadat/CRM-Lead-Automation-n8n',
      live: 'https://github.com/SulemanSadat/CRM-Lead-Automation-n8n',
      featured: false
    },
     {
      id: 4,
      title: 'Business Landing Page',
      description: 'fast-loading business landing page with SEO optimization to showcase services and improve customer engagement.',
       image: ariatiles,
      category: 'web',
      technologies: ['React.js', 'Adobe XD', 'Figma', 'CSS', 'HTML', 'JavaScript', 'SEO', 'Responsive Design'],
      github: 'https://github.com/SulemanSadat?tab=repositories',
      live: 'https://ariatiles.com/',
      featured: false
    },
     {
      id: 5,
      title: 'Healthcare Services',
      hidden: true,
      description: 'Developed a responsive healthcare website with SEO optimization to showcase services and improve patient inquiries and engagement.',
       image: Healthcare,
      category: 'web',
      technologies: ['HTML', 'CSS', 'JavaScript', 'SEO', 'Figma', 'Adobe XD', 'GitHub'],
      github: 'https://github.com/sulemansadat/Health',
      live: 'https://sulemansadat.github.io/Health/',
      featured: false
    },
     {
      id: 6,
      title: 'AI-Powered Mobile App',
      description: 'AI-enhanced, high-performance, and scalable, delivering top-quality experiences across Android and iOS 🔥',
       image: mobileapp,
      category: 'mobile',
      technologies: ['Flutter', 'Dart', 'Supabase', 'REST APIs', 'Git', 'OpenAI API', 'Figma', 'ReveuneCat', 'PostgreSQL'],
      github: 'https://github.com/SulemanSadat?tab=repositories',
      live: 'https://github.com/SulemanSadat?tab=repositories',
      featured: false
    },
    {
    id: 7,
    title: 'Upwork Accelerator',
    description: 'Built a Chrome Extension that displays client Hire Rates directly on Upwork job cards, eliminating 1+ click per job and speeding up review of 30–100+ job listings.',
    image: upworkAccelerator,
    category: 'web',
    technologies: ['JavaScript', 'Chrome Extension API', 'HTML', 'CSS', 'Git', 'GitHub'],
    github: 'https://github.com/SulemanSadat/upwork-accelerator',
    live: 'https://chromewebstore.google.com/detail/lpmgfgnefmaeaanofdjakdbemkieehgi',
    featured: true
  },
    // {
    //   id: 8,
    //   title: 'Telegram Chatbot',
    //   description: 'Custom Telegram Chatbot with real-time messaging with AI integration.',
    //    image: bot,
    //   category: 'chatbot',
    //   technologies: ['Telegram API', 'Python', 'PHP', 'Ngrok', 'BotFather', 'MySQL', 'OpenAI API'],
    //   github: 'https://github.com/SulemanSadat?tab=repositories',
    //   live: 'https://github.com/SulemanSadat?tab=repositories',
    //   featured: false
    // },



  ];

// Keep temporarily hidden work in the source of truth without rendering it publicly.
export const projects = allProjects.filter(project => !project.hidden);


