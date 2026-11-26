/* ------------------------------------------------------------------
   ALL SITE CONTENT LIVES IN THIS FILE.
   Edit the values below, save, and refresh the page.
   Any section whose list is empty ([]) is hidden automatically.
------------------------------------------------------------------- */
window.SITE = {
  profile: {
    name: "Henok Teklu",
    initials: "HT",
    photo: "", // e.g. "assets/photo.jpg" — leave empty to show initials
    headline: "Applied AI & Hydroinformatics PhD Candidate",
    subline: "Water Data Scientist · Water Resources Engineer",
    location: "Provo, Utah, USA",
    summary:
      "I build AI for water and public infrastructure: liquid and spiking neural networks, reinforcement learning, and machine learning for satellite Earth observation, grounded in more than ten years of designing dams, irrigation schemes, and water-supply systems.",
    resume: "", // e.g. "assets/resume.pdf" — leave empty to hide the button
    links: [
      { label: "GitHub", url: "https://github.com/anomaitech" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/henok-kiflom-teklu-903a12a5" },
      { label: "Google Scholar", url: "" }, // add your Scholar profile URL
      { label: "Email", url: "mailto:anommltech@gmail.com" },
    ],
  },

  about: [
    "I am an AI researcher and water resources engineer completing two concurrent PhDs: Applied Artificial Intelligence at Alma Mater Europaea and Hydroinformatics at Brigham Young University.",
    "My AI work centers on continuous-time (liquid) and spiking neural networks, reinforcement learning, and machine learning for satellite Earth observation, applied to civil engineering problems: groundwater assessment, streamflow bias correction, infrastructure design, and pedestrian road safety.",
    "More than ten years designing dams, irrigation schemes, water-supply systems, and flood-protection infrastructure give me a practical sense of what AI outputs mean for public infrastructure decisions, and of how to check whether a model is physically wrong before anyone relies on it.",
  ],

  interests: [
    {
      title: "Liquid neural networks",
      text: "Closed-form continuous-time (CfC/LTC) models for irregular, variable-time-step environmental and hydrologic signals.",
    },
    {
      title: "Spiking neural networks",
      text: "Event-driven, low-power networks for real-time perception and sequential decision-making.",
    },
    {
      title: "Groundwater & Earth observation",
      text: "Estimating storage change from GRACE/GRACE-FO, GLDAS, CHIRPS, and sparse in-situ well records.",
    },
    {
      title: "Reinforcement learning",
      text: "Optimization and design decision support for water-resources systems.",
    },
    {
      title: "Responsible AI for infrastructure",
      text: "Independent validation, physically consistent models, and engineer-in-the-loop tools.",
    },
    {
      title: "Road safety",
      text: "Pedestrian detection and crossing-intent prediction from event-based (DVS) cameras.",
    },
  ],

  skills: [
    {
      group: "Artificial intelligence",
      items: ["Deep learning", "Liquid neural networks (CfC/LTC)", "Spiking neural networks", "Reinforcement learning", "Time-series imputation", "Matrix completion", "Computer vision", "Physics-informed ML"],
    },
    {
      group: "AI/ML frameworks",
      items: ["PyTorch", "TensorFlow", "snnTorch", "scikit-learn"],
    },
    {
      group: "Programming & data",
      items: ["Python (NumPy, Pandas)", "R", "SQL", "JavaScript", "Django", "Flutter", "Docker", "Git", "Tethys Platform"],
    },
    {
      group: "Earth observation & GIS",
      items: ["GRACE/GRACE-FO", "GLDAS", "ERA5", "CHIRPS", "Sentinel-1/2", "EMIT", "Google Earth Engine", "ArcGIS", "QGIS"],
    },
    {
      group: "Hydrologic & hydraulic",
      items: ["HEC-HMS", "HEC-RAS", "WMS", "SMS", "WaterCAD", "AutoCAD", "Civil 3D"],
    },
    {
      group: "Engineering",
      items: ["Hydrologic & hydraulic modeling", "Flood analysis", "Groundwater modeling", "Irrigation, dam & water-supply design"],
    },
  ],

  projects: [
    {
      title: "CanalForge",
      period: "Terrain-aware irrigation network design",
      description:
        "Takes DEM, LiDAR, or survey terrain plus a command area, clusters it into zones, and designs main, secondary, and tertiary canals with reservoirs and pumps, including cut/fill volumes. Fully parametric with real-time regeneration. Validated by partially recreating the 60,000 ha Tendaho scheme (~60 km main canal, 98% coverage).",
      tags: ["Irrigation design", "Terrain analysis", "Parametric"],
      link: "",
      repo: "",
    },
    {
      title: "TethysDesk",
      period: "No-code app builder for the Tethys Platform",
      description:
        "Lets water scientists assemble Tethys web apps without writing code. Placed 2nd at the Tethys Foundation Hackathon, Chicago (2026). Developer and maintainer.",
      tags: ["Tethys Platform", "No-code", "Web apps"],
      link: "",
      repo: "",
    },
    {
      title: "Spiking Actor-Critic RL Agent",
      period: "snnTorch · PyTorch",
      description:
        "An actor-critic agent built from spiking neurons and trained on the CartPole control benchmark, testing event-driven networks for low-power sequential decision-making.",
      tags: ["Spiking neural networks", "Reinforcement learning"],
      link: "",
      repo: "",
    },
    {
      title: "Physics-Informed Neural Hydrology",
      period: "Exploratory research",
      description:
        "Differentiable parameter learning (dPL) combined with CfC/LTC architectures for continuous-time, variable-time-step hydrologic modeling.",
      tags: ["Physics-informed ML", "Liquid neural networks", "Hydrology"],
      link: "",
      repo: "",
    },
  ],

  experience: [
    {
      role: "Graduate Research Assistant",
      org: "Brigham Young University",
      period: "Sep 2024 — Present",
      points: [
        "Develop a seasonality-gated matrix-completion and liquid neural network (MC+LNN) framework to impute multi-decadal groundwater time series from sparse, irregular well observations.",
        "Estimate basin-wide groundwater storage change in the Great Salt Lake Basin by integrating GRACE/GRACE-FO, GLDAS, CHIRPS, and in-situ well data; first-author results validated against an independent GPS-based vertical-displacement estimate.",
        "GEOGloWS (Google-funded): machine-learning bias correction of global streamflow forecasts, applied at the runoff level before routing.",
        "Extended the GRACE Groundwater Subsetting Tool (GGST) with GLDAS integration on the Tethys web platform.",
      ],
    },
    {
      role: "Research Assistant",
      org: "Alma Mater Europaea",
      period: "2023 — Present",
      points: [
        "Develop a convolutional spiking neural network (Conv-SNN) that detects pedestrians and predicts crossing intent in real time from event-based (DVS) cameras.",
        "Research CfC liquid neural networks and spiking neural networks for native sequence modeling of environmental and hydrologic signals.",
        "Investigate reinforcement-learning approaches for water-resources optimization and engineering-design decision support.",
      ],
    },
    {
      role: "Senior Water Resources Engineer",
      org: "Tigray Water Works Study, Design & Supervision Enterprise, Ethiopia",
      period: "2012 — 2021",
      points: [
        "Led hydrologic and hydraulic design across irrigation, water-supply, and flood-protection projects, including irrigation schemes exceeding 20,000 ha of total command area.",
        "Designed dams, reservoirs, intake structures, pipelines, distribution systems, diversion weirs, spillways, canals, and river-crossing structures.",
        "Selected projects: Adigrat Water Supply (62 m earthen dam, 52 m intake tower) · Kaza Irrigation (10,000 ha) · Tekeze-Shiraro Pressurized Irrigation (6,000 ha) · Azafurgo Irrigation (4,000 ha) · IFAD-funded diversion irrigation projects.",
      ],
    },
  ],

  education: [
    {
      role: "PhD Candidate, Applied Artificial Intelligence",
      org: "Alma Mater Europaea, Slovenia (online)",
      period: "Expected Dec 2026",
      text: "Liquid neural networks, spiking neural networks, and reinforcement learning for civil and environmental systems, including road safety. GPA 9.9/10.",
    },
    {
      role: "PhD Candidate, Civil Engineering (Hydroinformatics)",
      org: "Brigham Young University, USA",
      period: "Expected May 2027",
      text: "Groundwater storage estimation, hydrologic time-series imputation, remote sensing, and AI for water resources. GPA 3.95/4.0.",
    },
    {
      role: "MSc, Water & Sustainable Development (Hydroinformatics & Digital Innovation)",
      org: "IHE Delft, Netherlands",
      period: "2024",
      text: "",
    },
    {
      role: "MSc, Software Engineering",
      org: "Sheba University, Ethiopia",
      period: "2017",
      text: "",
    },
    {
      role: "BSc, Water Resources & Environmental Engineering",
      org: "Jimma University, Ethiopia",
      period: "2012",
      text: "",
    },
  ],

  publications: [
    {
      group: "Journal & conference papers",
      items: [
        {
          authors: "Teklu, H., Jones, N.L., Williams, G.P., Sowby, R.B., & Serago, J.",
          year: "2026",
          title: "Groundwater Storage Trends in the Great Salt Lake Basin, 2002–2024",
          venue: "Journal of the American Water Resources Association, 62(6), e70163",
          link: "https://doi.org/10.1111/1752-1688.70163",
        },
        {
          authors: "Teklu, H., & Sakhai, M.",
          year: "2026",
          title: "Fast Event-Driven Pedestrian Crossing Detection Using Spiking Neural Networks with Adaptive Modulation",
          venue: "Intelligent Systems Conference (IntelliSys), 357–377",
          link: "",
        },
        {
          authors: "Barbosa, S.A., Jones, N.L., Williams, G.P., Teklu, H., Yidana, S.M., Pulla, S.T., et al.",
          year: "2025",
          title: "A multi-source approach to groundwater storage and recharge assessment in the Volta Basin",
          venue: "Science of the Total Environment, 1001, 180421",
          link: "",
        },
      ],
    },
    {
      group: "Preprints & in preparation",
      items: [
        {
          authors: "Teklu, H., Sakhai, M., Wielgosz, M., & Mertik, M.",
          year: "2026",
          title: "Pedestrian Crossing Intent Classification From Event-Based Vision Using Convolutional Spiking Neural Networks With Temporal Augmentation",
          venue: "arXiv:2609.13328",
          link: "https://arxiv.org/abs/2609.13328",
        },
        {
          authors: "Teklu, H., Sakhai, M., Mertik, M., & Wielgosz, M.",
          year: "2026",
          title: "Unsupervised Spiking Feature Learning for Event-Based Pedestrian Crossing Detection: Approaching Supervised Accuracy Without Labelled Training Data",
          venue: "arXiv:2609.31671",
          link: "https://arxiv.org/abs/2609.31671",
        },
        {
          authors: "Teklu, H., et al.",
          year: "in preparation",
          title: "Seasonality-gated matrix completion and liquid neural network imputation of groundwater time series",
          venue: "",
          link: "",
        },
      ],
    },
    {
      group: "Conference presentations",
      items: [
        {
          authors: "Teklu, H., Jones, N., Williams, G.P., & Nelson, J.",
          year: "2025",
          title: "Assessing Groundwater Storage Change in the Great Salt Lake Basin Using GRACE Data with Leakage Correction and In-Situ Well Validation",
          venue: "AGU Fall Meeting 2025, H31N-1251",
          link: "",
        },
        {
          authors: "Teklu, H.",
          year: "2026",
          title: "Liquid Neural Network–Based Imputation of Missing Groundwater Time Series Under Sparse Observations",
          venue: "Poster, CIROH Developers Conference 2026",
          link: "",
        },
      ],
    },
  ],

  awards: [
    { title: "Academicus Plus Merit Scholarship (€104,000)", issuer: "Alma Mater Europaea", date: "" },
    { title: "2nd Place, Tethys Foundation Hackathon", issuer: "Chicago", date: "2026" },
    { title: "3rd Place, Tethys Foundation Hackathon", issuer: "Tampa", date: "2025" },
    { title: "Graduate Research Assistantship", issuer: "Brigham Young University", date: "" },
    { title: "MENA & Horn of Africa Scholarship", issuer: "IHE Delft", date: "" },
    { title: "Top 10 National Innovation Award", issuer: "Ethiopia", date: "" },
  ],

  // Add your certificates here — the section appears once this list is not empty.
  // { title: "Certificate name", issuer: "Issuing organization", date: "2026", link: "https://..." }
  certificates: [],

  contact: {
    text: "I am glad to hear about research collaborations, AI for water and infrastructure, and opportunities in applied AI and hydroinformatics.",
    email: "anommltech@gmail.com",
  },
};
