import React from 'react';
import "./AboutUs.css"; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom'; // Importing Link for navigation

const AboutUs = () => {
  return (
    <div className='about-us-wrapper'>
    <div className="about-us-container">
      <section className="about-intro">
        <h1>About Athai.Space</h1>
        <p>
            Athai.Space is the official digital home of Athletes Academy,
            a pioneering Sports-Tech initiative by Giopolice Sports Tech © 2025. 
            Combining AI, live coaching, and global connectivity,
            Athai.Space empowers athletes, coaches, and entire sports ecosystems. 
            Founded in 2023, Athletes Academy redefines access to elite coaching via 
            cutting-edge tech and performance science.</p>
      </section>

      <section className="vision-mission">
        <h2 style={{"marginBottom":"0"}}>Our Vision & Mission</h2>
        <h3  style={{"marginTop":"0"}}>Vision</h3>
        <p>A world where every aspiring athlete — regardless of geography — has access to world-class coaching digitally.</p>
        <h3>Mission</h3>
        <ul>
          <li>Provide athletes with AI-powered training, nutrition, and injury-prevention programs.</li>
          <li>Equip coaches with tools for scalable, optimal athlete management.</li>
        </ul>
        <p>We aim to blend timeless athletic values with smart,
           integrated tech for every sports ecosystem—from rural NGOs to city-based scouts.</p>
      </section>

      <section className="key-highlights">
        <h2  style={{"marginBottom":"0"}}>Key Highlights</h2>
        <h3  style={{"marginTop":"0"}}>🔍 Tailored Learning for Athletes</h3>
        <ul>
          <li>AI-curated fitness plans, diet guides, and recovery tips.</li>
          <li>Smart feedback loops and real-time progress tracking.</li>
          <li>Integrated wallet system for trust-based booking and payments.</li>
        </ul>
        <h3>📈 Coach and Mentor Empowerment</h3>
        <ul>
          <li>Unified dashboard for client and group management.</li>
          <li>Behavior insights and dynamic training analytics.</li>
          <li>Interactive chat and video calling tools.</li>
        </ul>
        <h3>🏛️ Ecosystem for NGOs, Scouts, Academies</h3>
        <ul>
          <li>Talent onboarding from underserved regions.</li>
          <li>Multilingual support and verified athlete profiles.</li>
        </ul>
      </section>

      <section className="why-athai">
  <h2>Why Choose Athai.Space?</h2>
  <p>Athai.Space offers a unique blend of technology and accessibility that empowers athletes, coaches, and sports organizations to thrive. Here's how:</p>

  <table>
    <thead>
      <tr>
        <th>🌟 Benefit</th>
        <th>🚀 What It Means for You</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>AI-Driven Personalization</td>
        <td>Smart training plans tailored to your goals, fitness level, and performance—just like having your own digital coach.</td>
      </tr>
      <tr>
        <td>Global Reach, Local Impact</td>
        <td>Train and connect from anywhere in the world, removing barriers to world-class coaching and collaboration.</td>
      </tr>
      <tr>
        <td>All-In-One Platform</td>
        <td>Everything in one place—live coaching, real-time chat, secure payments, and performance tracking to streamline your journey.</td>
      </tr>
      <tr>
        <td>Pay-As-You-Grow Costs</td>
        <td>Flexible pricing that scales with your needs, 
          from solo athletes to full academies—grow at your own pace.</td>
      </tr>
    </tbody>
  </table>
</section>


      <section className="founder-section">
        <h2>Meet the Founders</h2>
        <p>
        <b>Vipin Kumar</b><br/><br/>Vipin Kumar, CEO of Athletes Academy and founder of Athai.Space, brings 9+ years in product engineering.
        His journey merges accessibility, affordability, and data-driven coaching to make elite sports training universally available.<br/><br/>
        Connect with Vipin on LinkedIn:<br/>
        <Link  to="https://www.linkedin.com/in/vipinkumar18?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
        target="_blank" className='link-style'> https://www.linkedin.com/in/vipinkumar18?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
        </Link> </p>

        {/* <p><b>Shivani Chauhan</b><br/><br/>Shivani Chauhan, CEO of Athletes Academy and founder of Athai.Space, brings 9+ years in product engineering.
        His journey merges accessibility, affordability, and data-driven coaching to make elite sports training universally available.<br/><br/>
        Connect with Shivani on LinkedIn:<br/>
        <Link to="https://www.linkedin.com/in/vipinkumar18?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" >
        https://www.linkedin.com/in/vipinkumar18?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
        </Link> </p> */}

        <p><b>Sanjeev – Chief Technology Officer (CTO)</b><br/><br/>
        Sanjeev, an MBA and B.Tech graduate, brings 8 years of experience in sustainable project management and IT leadership. With strong expertise in Java and software development, he combines technical insight with strategic vision. As CTO,he drives innovation, oversees technology development, 
        and leads services companies with a focus on sustainable growth and impactful solutions.<br/><br/>
        Connect with Sanjeev on LinkedIn:<br/>
        <Link to="https://www.linkedin.com/in/sanjeevsharma18?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className='link-style' >
       https://www.linkedin.com/in/sanjeevsharma18?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
        </Link> </p>
       
      </section>

      <section className="core-values">
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Progress:</strong> Data-led improvements  arbitrary routines</li>
          <li><strong>Inclusivity:</strong> Fair scalability for every player and coach</li>
          <li><strong>Integrity:</strong> Verified credentials, ethical pay, and privacy</li>
          <li><strong>Future-Ready:</strong> AI upgrades and global reach</li>
        </ul>
      </section>

      <section className="join-us">
        <h2>Join Us at Athai.Space</h2>
        <p>Whether you're an athlete, a coach, or a community leader — Athai.Space is your gateway to the future of sports.
           Train, connect, grow.
        <br/><Link to="https://www.linkedin.com/company/athai/"  target="_blank" >
        https://www.linkedin.com/company/athai/</Link><br/><br/>
        ©2025 Athletes Academy by Giopolice Sports Tech. All rights reserved.</p>
        

      </section>
    </div>
    </div>
  );
};

export default AboutUs;
