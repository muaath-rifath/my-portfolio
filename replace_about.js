const fs = require('fs');

const file = '/home/muaathrifath/Projects/Portfolio/my-portfolio/components/about-section.tsx';
let content = fs.readFileSync(file, 'utf8');

const newAboutContent = `const AboutContent = () => (
  <div className="space-y-6 text-muted-foreground text-sm md:text-base leading-relaxed">
    <p>
      I am a <span className="font-semibold dark:text-white text-[#006b42]">Software Engineer</span> who thrives at the boundaries of systems. My work rarely stays in one layer—I build across backend APIs, real-time communications, AI pipelines, and embedded firmware. To me, the most interesting engineering challenges happen where these different domains intersect.
    </p>

    <p>
      My core philosophy is that <span className="font-semibold dark:text-white text-[#006b42]">AI is most interesting when it leaves the chat window</span>. Instead of just wrapping LLMs, I focus on the hard infrastructure underneath: semantic grounding, multimodal interfaces, and safely giving agents capability-scoped access to the physical world.
    </p>

    <p>
      I care deeply about the parts of a product that don't show up in screenshots. Whether I'm architecting a resilient telemedicine platform, designing distributed databases, or writing OTA update systems for custom hardware, my focus is always on building <span className="font-semibold dark:text-white text-[#006b42]">reliable, secure, and highly functional infrastructure</span>.
    </p>

    <p>
      Locally, I run <span className="font-semibold dark:text-white text-[#006b42]">Arch Linux + Hyprland</span>. I appreciate software that does exactly what it needs to do and then gets out of the way, and I bring that same minimalist, no-nonsense philosophy to the systems I engineer.
    </p>
  </div>
);`;

// Find the start and end of the AboutContent component
const startRegex = /const AboutContent = \(\) => \(/;
const match = content.match(startRegex);

if (match) {
  const startIndex = match.index;
  // Find the closing ');' for the AboutContent component
  const remainder = content.substring(startIndex);
  const endMatch = remainder.match(/\n\);/);
  
  if (endMatch) {
    const endIndex = startIndex + endMatch.index + endMatch[0].length;
    
    // Replace the content
    const newFileContent = content.substring(0, startIndex) + newAboutContent + content.substring(endIndex);
    fs.writeFileSync(file, newFileContent, 'utf8');
    console.log("Successfully replaced AboutContent");
  } else {
    console.log("Could not find the end of AboutContent");
  }
} else {
  console.log("Could not find AboutContent");
}
