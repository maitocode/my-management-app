import React, { useEffect } from 'react'
import './Skill.scss'
import SkillItem, {getItemsContainerId} from '../SkillItem/SkillItem';
import { skillsData } from '../../../../data';


const osElementId = "skill_os";
const databaseElementId = "skill_database";
const webElementId = "skill_web";
const devopsElementId = "skill_devops";
const toolElementId = "skill_tool";
const otherElementId = "skill_other";

function Skill(props) {
  useEffect(() => {
    addAnimationWhetherOverflow(osElementId);
    addAnimationWhetherOverflow(databaseElementId);
    addAnimationWhetherOverflow(webElementId);
    addAnimationWhetherOverflow(devopsElementId);
    addAnimationWhetherOverflow(toolElementId);
    addAnimationWhetherOverflow(otherElementId);
  }, [])

  return (
    <div className='portfolio-skill'>
        <div className="label-rotate">Skills</div>
        <SkillItem id={osElementId} label={skillsData.os.name} skills={skillsData.os.items} />
        <SkillItem id={databaseElementId} label={skillsData.database_skill.name} skills={skillsData.database_skill.items} />
        <SkillItem id={webElementId} label={skillsData.web_skill.name} skills={skillsData.web_skill.items} />
        <SkillItem id={devopsElementId} label={skillsData.devops_skill.name} skills={skillsData.devops_skill.items} />
        <SkillItem id={toolElementId} label={skillsData.tools.name} skills={skillsData.tools.items} />
        <SkillItem id={otherElementId} label={skillsData.others.name} skills={skillsData.others.items} />
    </div>
  )
}

const addAnimationWhetherOverflow = (skillElementId: string) => {
  const containerItemsId = getItemsContainerId(skillElementId);
  const containerGroupItemsElementWidth = document.getElementById(containerItemsId)?.clientWidth || 0;
  const groupItemsElement = document.querySelector(`#${containerItemsId} div`);
  const groupItemsElementWidth = groupItemsElement?.clientWidth || 0;

  console.log(skillElementId, containerGroupItemsElementWidth, "<", groupItemsElementWidth, containerGroupItemsElementWidth < groupItemsElementWidth);
  if (containerGroupItemsElementWidth < groupItemsElementWidth) {
    addAnimationHandle(
      groupItemsElement as HTMLElement, 
      skillElementId, 
      containerGroupItemsElementWidth, 
      groupItemsElementWidth
    );
  }
}

const addAnimationHandle = (element: HTMLElement, id: string, containerWidth: number, groupItemsWidth: number) => {

  const animationName = `left-right-${id}`;
  const animationDuration = (groupItemsWidth - containerWidth) / 25 + "s";
  const translateFrom = 0;
  const translateTo = ((groupItemsWidth - containerWidth) / groupItemsWidth) * 100;
  const animation_keyframe = `
  @keyframes ${animationName} {
    0%, 10% {
        transform: translateX(${translateFrom});
    }

    90%, 100% {
        transform: translateX(-${translateTo}%);
    }
  }`;

  const dynamicStyle = document.createElement('style');
  dynamicStyle.innerText = animation_keyframe;
  document.head.appendChild(dynamicStyle);

  element.style.animationName = animationName;
  element.style.animationDuration = animationDuration;
  element.style.animationDirection = "alternate";
  element.style.animationIterationCount = "infinite"
  element.style.animationTimingFunction = "linear";
  element.style.animationDelay = "2s";
  console.log(id, animationDuration)
}

export default Skill
