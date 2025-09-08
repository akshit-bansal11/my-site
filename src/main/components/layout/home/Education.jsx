import React from "react";
import ScrollSection from "../../common/sections/ScrollSection";
import ScrollSectionHeading from "../../common/headings/ScrollSectionHeading";
import EduItem from "../../common/cards/EduItem";

export default function Education() {
    return (
        <ScrollSection id="education">
            <div className="flex w-full gap-2 items-baseline"><ScrollSectionHeading heading="education" /></div>
            <EduItem
                location="Punjab, India"
                company="Maharaja Ranjit Singh Punjab Technical University"
                role="Bachelor of Technology in Computer Science & Engineering"
                date="2022 - Ongoing"
            />
            <EduItem
                location="Punjab, India"
                company="Central Board of Secondary Education"
                role="Senior Secondary Schooling"
                date="2021 - 2022"
            />
            <EduItem
                location="Punjab, India"
                company="Central Board of Secondary Education"
                role="Metriculation"
                date="2019 - 2020"
            />
        </ScrollSection>
    );
}
