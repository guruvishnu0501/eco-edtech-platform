<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Academic Atelier - Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Manrope:wght@400;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .material-symbols-outlined.filled {
            font-variation-settings: 'FILL' 1;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-variant": "#e1e2ed",
                        "surface-dim": "#d9d9e5",
                        "on-secondary-fixed": "#00174b",
                        "on-surface-variant": "#434655",
                        "on-primary-container": "#eeefff",
                        "on-surface": "#191b23",
                        "on-background": "#191b23",
                        "tertiary-fixed": "#ffdbcd",
                        "outline-variant": "#c3c6d7",
                        "surface-bright": "#faf8ff",
                        "on-primary-fixed-variant": "#003ea8",
                        "on-secondary-fixed-variant": "#31447b",
                        "on-error": "#ffffff",
                        "on-primary-fixed": "#00174b",
                        "surface-container-highest": "#e1e2ed",
                        "surface-container-high": "#e7e7f3",
                        "on-primary": "#ffffff",
                        "error": "#ba1a1a",
                        "surface-container-lowest": "#ffffff",
                        "primary": "#004ac6",
                        "primary-container": "#2563eb",
                        "surface": "#faf8ff",
                        "error-container": "#ffdad6",
                        "primary-fixed": "#dbe1ff",
                        "inverse-primary": "#b4c5ff",
                        "on-tertiary": "#ffffff",
                        "surface-container-low": "#f3f3fe",
                        "tertiary-fixed-dim": "#ffb596",
                        "on-tertiary-fixed-variant": "#7d2d00",
                        "surface-container": "#ededf9",
                        "on-secondary": "#ffffff",
                        "inverse-on-surface": "#f0f0fb",
                        "primary-fixed-dim": "#b4c5ff",
                        "secondary-container": "#acbfff",
                        "tertiary-container": "#bc4800",
                        "secondary-fixed-dim": "#b4c5ff",
                        "secondary-fixed": "#dbe1ff",
                        "tertiary": "#943700",
                        "on-error-container": "#93000a",
                        "background": "#faf8ff",
                        "on-secondary-container": "#394c84",
                        "surface-tint": "#0053db",
                        "outline": "#737686",
                        "on-tertiary-container": "#ffede6",
                        "inverse-surface": "#2e3039",
                        "on-tertiary-fixed": "#360f00",
                        "secondary": "#495c95"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "fontFamily": {
                        "headline": ["Manrope", "sans-serif"],
                        "body": ["Inter", "sans-serif"],
                        "label": ["Inter", "sans-serif"]
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-surface text-on-surface font-body antialiased min-h-screen flex selection:bg-primary-container selection:text-on-primary-container">
<!-- SideNavBar -->
<aside class="h-screen w-64 fixed left-0 top-0 bg-slate-50 dark:bg-slate-950 flex flex-col p-6 gap-y-4 z-40 bg-surface-container-low dark:bg-slate-900 border-r-0">
<!-- Header -->
<div class="flex items-center gap-4 mb-8 px-2">
<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary shadow-[0_10px_40px_rgba(25,27,35,0.06)]">
<span class="material-symbols-outlined">architecture</span>
</div>
<div>
<h1 class="text-lg font-black text-blue-800 dark:text-blue-200 font-headline tracking-tight">The Atelier</h1>
<p class="text-xs text-on-surface-variant font-label tracking-wide uppercase">Precision Learning</p>
</div>
</div>
<!-- Navigation Links -->
<nav class="flex-1 flex flex-col gap-2">
<!-- Active: Dashboard -->
<a class="bg-blue-600 dark:bg-blue-500 text-white rounded-xl shadow-lg flex items-center gap-3 px-4 py-3 font-manrope font-semibold active:opacity-80 transition-all font-headline" href="#">
<span class="material-symbols-outlined filled">dashboard</span>
                Dashboard
            </a>
<a class="text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl flex items-center gap-3 px-4 py-3 font-manrope font-semibold hover:translate-x-1 transition-transform active:opacity-80 transition-all font-headline" href="#">
<span class="material-symbols-outlined">school</span>
                My Courses
            </a>
<a class="text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl flex items-center gap-3 px-4 py-3 font-manrope font-semibold hover:translate-x-1 transition-transform active:opacity-80 transition-all font-headline" href="#">
<span class="material-symbols-outlined">quiz</span>
                Quizzes
            </a>
<a class="text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl flex items-center gap-3 px-4 py-3 font-manrope font-semibold hover:translate-x-1 transition-transform active:opacity-80 transition-all font-headline" href="#">
<span class="material-symbols-outlined">leaderboard</span>
                Leaderboard
            </a>
<div class="mt-auto"></div>
<a class="text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl flex items-center gap-3 px-4 py-3 font-manrope font-semibold hover:translate-x-1 transition-transform active:opacity-80 transition-all font-headline" href="#">
<span class="material-symbols-outlined">settings</span>
                Settings
            </a>
</nav>
<!-- CTA -->
<button class="mt-4 w-full bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl py-3 px-4 font-headline font-semibold text-sm shadow-[0_10px_40px_rgba(25,27,35,0.06)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[20px]">add</span>
            New Study Session
        </button>
</aside>
<!-- Main Content Wrapper -->
<div class="ml-64 flex-1 flex flex-col min-h-screen relative">
<!-- TopNavBar -->
<header class="w-full sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm dark:shadow-none flex justify-between items-center px-8 h-16 max-w-screen-2xl mx-auto no-border bg-surface-container-low dark:bg-slate-800/50">
<div class="flex items-center gap-8">
<span class="text-xl font-bold text-blue-700 dark:text-blue-400 font-manrope font-headline">Academic Atelier</span>
<nav class="hidden md:flex gap-6">
<a class="text-slate-600 dark:text-slate-400 font-medium font-manrope tracking-tight hover:text-blue-600 dark:hover:text-blue-300 transition-colors active:scale-95 duration-200 font-headline" href="#">Curriculum</a>
<a class="text-slate-600 dark:text-slate-400 font-medium font-manrope tracking-tight hover:text-blue-600 dark:hover:text-blue-300 transition-colors active:scale-95 duration-200 font-headline" href="#">Resources</a>
</nav>
</div>
<div class="flex items-center gap-4">
<button class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant/50">
<span class="material-symbols-outlined">dark_mode</span>
</button>
<button class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant/50 relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<img alt="User Profile Avatar" class="w-9 h-9 rounded-full object-cover border-2 border-surface-container-highest cursor-pointer hover:border-primary transition-colors" data-alt="close up portrait of young woman with clear skin and neutral expression against clean background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4uPCo0U7HroHgLQ6qnCr50awGEkAUL1KPEAupsaWtI0zuPahRDjk_fVtqHyTE47XHgHCnn312mm8ux0XrWRtJOy6zK-G6Dnl15Joyj36kaCYGyNBvv5LwfrlZjffrIxiOB71vQ8Ds_T8cv3Gg3vcVi2HnQPJsGT3EsZZHh4xGRBE8UWjVWrI8hpAAvafgJEESWsCZAYhKLhA33CgSkm69hiZ1CVdVCMuQ1MH-nSpZNRiqXwSvPP4Zjc96bL4fCB4uSnJ8u_TWwE8"/>
</div>
</header>
<!-- Canvas / Main Dashboard Content -->
<main class="flex-1 p-10 max-w-screen-2xl mx-auto w-full">
<!-- Page Header -->
<div class="mb-10 flex justify-between items-end">
<div>
<h2 class="font-headline text-[2.5rem] font-bold text-on-surface leading-tight tracking-tight">Overview</h2>
<p class="font-body text-on-surface-variant text-lg mt-1">Track your intellectual pursuits.</p>
</div>
<div class="flex gap-2">
<span class="bg-secondary-container text-on-secondary-container rounded-full px-4 py-1.5 font-label text-sm font-semibold flex items-center gap-2">
<span class="material-symbols-outlined text-[16px]">local_fire_department</span>
                        12 Day Streak
                    </span>
</div>
</div>
<!-- Bento Grid Layout -->
<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
<!-- Left Column (Spans 2) -->
<div class="xl:col-span-2 flex flex-col gap-8">
<!-- Progress Summary (Glassmorphism/High-end card) -->
<section class="bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-[0_10px_40px_rgba(25,27,35,0.04)] relative overflow-hidden group">
<!-- Decorative Gradient blob -->
<div class="absolute -right-20 -top-20 w-64 h-64 bg-primary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
<div class="flex justify-between items-start mb-8 relative z-10">
<div>
<h3 class="font-headline text-xl font-bold text-on-surface">Curriculum Progress</h3>
<p class="font-body text-sm text-on-surface-variant mt-1">Your current active semester</p>
</div>
<button class="text-primary font-label text-sm font-semibold flex items-center gap-1 hover:text-primary-container transition-colors">
                                View Details <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
<div class="grid grid-cols-3 gap-6 relative z-10">
<!-- Stat Block -->
<div class="flex flex-col gap-2">
<span class="font-headline text-3xl font-extrabold text-on-surface">42</span>
<span class="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Hours Studied</span>
</div>
<!-- Stat Block -->
<div class="flex flex-col gap-2 border-l border-outline-variant/20 pl-6">
<span class="font-headline text-3xl font-extrabold text-on-surface">4</span>
<span class="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Courses Completed</span>
</div>
<!-- Stat Block -->
<div class="flex flex-col gap-2 border-l border-outline-variant/20 pl-6">
<span class="font-headline text-3xl font-extrabold text-primary">85%</span>
<span class="font-label text-xs uppercase tracking-widest text-on-surface-variant font-semibold">Average Score</span>
</div>
</div>
<!-- Progress Bar -->
<div class="mt-8 relative z-10">
<div class="flex justify-between font-label text-sm mb-2 text-on-surface-variant">
<span>Overall Completion</span>
<span class="font-semibold text-primary">68%</span>
</div>
<div class="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
<div class="bg-gradient-to-r from-primary to-primary-container h-2.5 rounded-full" style="width: 68%"></div>
</div>
</div>
</section>
<!-- Quiz of the Day (Asymmetric / Container shift) -->
<section class="bg-surface-container-low rounded-[1.5rem] p-8 flex flex-col md:flex-row gap-8">
<div class="md:w-5/12 flex flex-col justify-between">
<div>
<div class="w-12 h-12 bg-surface-container-lowest rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm">
<span class="material-symbols-outlined">psychology_alt</span>
</div>
<h3 class="font-headline text-2xl font-bold text-on-surface leading-tight">Daily Calibration</h3>
<p class="font-body text-on-surface-variant mt-3 text-sm leading-relaxed">Test your retention of yesterday's key concepts in Cognitive Science.</p>
</div>
<div class="mt-8">
<span class="bg-surface-container-highest text-on-surface rounded-full px-3 py-1 font-label text-xs font-semibold uppercase tracking-wide">Cognitive Science 101</span>
</div>
</div>
<div class="md:w-7/12 bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col justify-center">
<h4 class="font-headline text-lg font-semibold text-on-surface mb-6">Which cognitive bias describes the tendency to rely too heavily on the first piece of information offered?</h4>
<div class="flex flex-col gap-3">
<!-- Option 1 -->
<button class="w-full text-left px-5 py-4 rounded-xl bg-surface hover:bg-surface-container transition-colors border border-outline-variant/20 font-body text-on-surface flex items-center gap-4 group">
<span class="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
<span class="w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-20"></span>
</span>
                                    Confirmation Bias
                                </button>
<!-- Option 2 (Selected state example) -->
<button class="w-full text-left px-5 py-4 rounded-xl bg-primary-fixed border-b-2 border-primary font-body text-on-primary-fixed flex items-center gap-4 group transition-all shadow-sm">
<span class="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
<span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
</span>
                                    Anchoring Effect
                                </button>
<!-- Option 3 -->
<button class="w-full text-left px-5 py-4 rounded-xl bg-surface hover:bg-surface-container transition-colors border border-outline-variant/20 font-body text-on-surface flex items-center gap-4 group">
<span class="w-6 h-6 rounded-full border-2 border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
<span class="w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-20"></span>
</span>
                                    Dunning-Kruger Effect
                                </button>
</div>
</div>
</section>
</div>
<!-- Right Column (Spans 1) -->
<div class="xl:col-span-1 h-full">
<!-- Leaderboard Panel -->
<section class="bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-[0_10px_40px_rgba(25,27,35,0.04)] h-full flex flex-col">
<div class="flex justify-between items-center mb-8">
<h3 class="font-headline text-xl font-bold text-on-surface">Top Scholars</h3>
<button class="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors">
<span class="material-symbols-outlined">more_vert</span>
</button>
</div>
<!-- Podium / Top 3 Highlight -->
<div class="flex items-end justify-center gap-4 mb-10 mt-4">
<!-- 2nd Place -->
<div class="flex flex-col items-center">
<img alt="Student Avatar" class="w-12 h-12 rounded-full object-cover border-2 border-surface-container-lowest shadow-md z-10 -mb-3" data-alt="portrait of smiling young man with short dark hair wearing a casual sweater against light background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeco-5nQbSdGOSsCPo3mJ1evVZJru4i0vNd0dQZ54EB8oFhfHsmrvscEhQ9j37-U-xovktdN5I1E3cLYrfIOpKnvsXoK4V4MH4B98y2nV0PhBwhTt599TJu7y2cGnYHsP6GO-grB2p1_NlEhkq-AFk_OOUf4y9HawlE2kC7rNz-cfPfa7aZIFHxpooVBKtGz-O3_qBTaN0VWtbjn29Ym6P5N84OWGumDVxZE2nXFSFwxgg9v6uCdDnCyJ0npycZW9nec_NSmyW79I"/>
<div class="bg-surface-container-low w-16 h-20 rounded-t-xl flex flex-col items-center justify-end pb-2 relative">
<span class="absolute top-2 font-headline font-bold text-on-surface-variant opacity-50">2</span>
<span class="font-label text-xs font-semibold text-on-surface">2.4k</span>
</div>
</div>
<!-- 1st Place -->
<div class="flex flex-col items-center">
<div class="relative">
<span class="material-symbols-outlined absolute -top-6 left-1/2 -translate-x-1/2 text-tertiary text-2xl drop-shadow-sm">workspace_premium</span>
<img alt="Student Avatar" class="w-16 h-16 rounded-full object-cover border-4 border-surface-container-lowest shadow-lg z-10 -mb-3 relative" data-alt="close up portrait of young woman with dark hair looking directly at camera with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAsm6Cs6LmuE-K0Sk6KlfxVBYrYvNtataXfRm8ORz212sFsDsrJNqP6b3rUq1zE--YPQgasCYV-5KXUgRKXqfwSpGVs6e16z1xc48PoQpQZWRkrVvf5Y9T9XK0AAYGdV-DmDX6DH50ZSdMrSGdfna61EM5nVxquWGM7xi_18x2wLM5ZUTi4HlkoVLZ9V7-mUTIxeTWYuEJubLIfQlUfjQ4WsYFe7dwODfg_qR6P8yRqlN8ch6OMd8Qv-cWMYd_1X7zD4e6qrS0I8o"/>
</div>
<div class="bg-gradient-to-t from-primary-container/20 to-primary/5 w-20 h-28 rounded-t-xl flex flex-col items-center justify-end pb-3 relative">
<span class="absolute top-3 font-headline text-xl font-extrabold text-primary">1</span>
<span class="font-label text-sm font-bold text-primary">2.8k</span>
</div>
</div>
<!-- 3rd Place -->
<div class="flex flex-col items-center">
<img alt="Student Avatar" class="w-12 h-12 rounded-full object-cover border-2 border-surface-container-lowest shadow-md z-10 -mb-3" data-alt="portrait of young woman with glasses smiling brightly against natural outdoor background out of focus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDRkFQXJ8b6fTr23xXg4I352bWwCq9mNKwR_3Ror3Lw7tZ-dKc-pC_EgSRgUSLpQBShOVeyav8aOrFhCdhmy1lqosT4vk0JsDRy72-_Ew4kEzhscOkqyPRUA0-S_zgOsBPu0T63-aWKp-PrDEMA-M04Nkg774OLG1O9ekQu1X4XLpA_pqve7cTVNJK4H2YtUrpt4M6pihDwd7wqAT9ohU7uVybCxXyTqoc2Zov_Dg37WX4mI_G_G24mJ9k2s3Fa6Qy6tjg0Bt7DjQ"/>
<div class="bg-surface-container-low w-16 h-16 rounded-t-xl flex flex-col items-center justify-end pb-2 relative">
<span class="absolute top-2 font-headline font-bold text-on-surface-variant opacity-50">3</span>
<span class="font-label text-xs font-semibold text-on-surface">2.1k</span>
</div>
</div>
</div>
<!-- List format for rest -->
<div class="flex flex-col flex-1 gap-1">
<!-- List Item 4 -->
<div class="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-default">
<span class="font-headline font-bold text-on-surface-variant w-4 text-center">4</span>
<img alt="Student Avatar" class="w-10 h-10 rounded-full object-cover border border-outline-variant/20" data-alt="portrait of man with stubble and casual shirt looking confident against blurred city background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBFYSursdxqC9KVD2qefJCre-V7soAoZYteeLXH_UQtL2z_7pNjhDG5GnnU44fBvsnNrQsC6kkzh2d0fqMm646opYJF2gfqFrdzwI_gEOyXH1PLZJ00NK3-0hhUzzk-t7i7j7CK2HWwlmLY-_OnRWf4sf40BtS7yqWhRRpoLhkZavSTOY41_hQDFGSAMqirpxKLGGw9IxGB5Gb5TAdgk6sZCN-GLZh__olErW_ck9rQuc0KBI7hZV7G-nvocUiXO56jvWWZkCYj4w"/>
<div class="flex-1">
<p class="font-headline text-sm font-semibold text-on-surface">Marcus Chen</p>
<p class="font-body text-xs text-on-surface-variant">Philosophy Dept.</p>
</div>
<span class="font-label text-sm font-semibold text-primary">1,950</span>
</div>
<!-- List Item 5 -->
<div class="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-default">
<span class="font-headline font-bold text-on-surface-variant w-4 text-center">5</span>
<img alt="Student Avatar" class="w-10 h-10 rounded-full object-cover border border-outline-variant/20" data-alt="portrait of young woman with dark curly hair smiling against soft warm lit indoor background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPdsOmDmrIf-phFUNBjb0inFu5hPQELmEtcMKqasjdGiK7cRy1zw8w-H8eh4bd_kXPI7kmH3L2DnrCg-hnChRzGXIatQ53pcm_kcf7fAiTUtaHDC5Ru3qvbjh6YxIW6bOhQCXDyZrrZN2IzJwZH2xFzRDK1npjfbDF81R3n_poKll_gAltrh-Jheh5Wh4z1FODZr1SKYaGJ8g9WG9I1uWzdTXJU8W8MJSttKO8w_V2rOfCSKG9Tp2ajDJKVG8QxQA6aEMKVcDCZ18"/>
<div class="flex-1">
<p class="font-headline text-sm font-semibold text-on-surface">Elena Rodriguez</p>
<p class="font-body text-xs text-on-surface-variant">Data Science</p>
</div>
<span class="font-label text-sm font-semibold text-primary">1,820</span>
</div>
<!-- List Item 6 -->
<div class="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-container-low transition-colors group cursor-default">
<span class="font-headline font-bold text-on-surface-variant w-4 text-center">6</span>
<div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-headline font-bold text-sm">
                                    JD
                                </div>
<div class="flex-1">
<p class="font-headline text-sm font-semibold text-on-surface">James Dawson</p>
<p class="font-body text-xs text-on-surface-variant">Linguistics</p>
</div>
<span class="font-label text-sm font-semibold text-primary">1,705</span>
</div>
</div>
<button class="mt-4 w-full py-3 rounded-xl text-primary font-headline text-sm font-semibold hover:bg-surface-container-low transition-colors">
                            View Full Rankings
                        </button>
</section>
</div>
</div>
</main>
</div>
</body></html>