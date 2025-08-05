// src/components/Skills.jsx

import React from 'react';

const Skills = ({ data }) => {
  return (
    <section id="skill">
      <h1 className="sub-heading">{data.heading}</h1>
      <div className="divider"></div>
      <p className="sub-para">{data.sub_para}</p>
      
      <div className="skill-list-container">
        {data.skill_categories && data.skill_categories.map(category => (
          <div className="skill-category" key={category.id}>
            <h3>{category.category_name}:</h3>
            <p>{category.skill_list}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;