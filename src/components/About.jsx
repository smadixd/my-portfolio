/*
  ! This component is the About me section of the portfolio.
*/
import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <motion.div style={{ height: "100%" }}>
      <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Introduction.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary flex w-full text-sm md:text-base lg:text-lg leading-normal md:leading-relaxed"
      >
        I am a dedicated and skilled full-stack developer with expertise in
        React-based web development and Node.js. With a strong background in
        JavaScript/TypeScript, I have honed my skills in building efficient and
        scalable applications. I thrive in dynamic work environments and have
        experience working in Agile teams, where I have consistently delivered
        projects on time and met milestones.<br></br>
        <br></br>
        Throughout my career, I have been involved in developing web-based
        interfaces and RESTful APIs. I have a deep understanding of React.js and
        Node.js, leveraging these technologies to create engaging user
        experiences and robust server-side functionality. My proficiency in
        these frameworks has allowed me to build applications that are both
        user-friendly and performant.<br></br>
        <br></br>
        includes developing cross-platform mobile applications using React
        Native. I have experience in building apps from the ground up, utilizing
        React Native's capabilities to create intuitive user interfaces and
        integrate with various APIs. My work on these applications demonstrates
        my ability to adapt to different project requirements and deliver
        high-quality solutions.<br></br>
      </motion.p>
    </motion.div>
  );
};

export default SectionWrapper(About, "about");