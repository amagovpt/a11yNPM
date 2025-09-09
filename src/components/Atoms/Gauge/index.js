import React, { useState, useEffect } from "react";
import "./styles.css";

const Gauge = ({ darkTheme, percentage, title, screenReaderTitle, type }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const theme = darkTheme === "dark" ? "dark" : ""

  useEffect(() => {
    if (percentage) {
      setAnimatedPercentage(percentage);
    } else {
      if(percentage !== 0) {
        const interval = setInterval(() => {
          setAnimatedPercentage((prevPercentage) => {
            if (prevPercentage < 100) {
              return prevPercentage + 1;
            } else {
              clearInterval(interval);
              return 0;
            }
          });
        }, 20);
      } else {
        setAnimatedPercentage(0);
      }
    }
  }, [percentage]);

  const calculateDashOffset = () => {
    const totalLength = 248;
    let result = 248;
    const adjustedPercentage = animatedPercentage * 10;
    result = totalLength - (totalLength*(adjustedPercentage/100))
    return result;
  };

  const determineColorClass = () => {
    if(type === "100") {
      if (animatedPercentage >= 7.5) {
        return "green";
      } else if (animatedPercentage >= 5) {
        return "yellow";
      } else if (animatedPercentage > 0) {
        return "red";
      } else {
        return "grey";
      }
    } else {
      if (animatedPercentage >= 8) {
        return "green";
      } else if (animatedPercentage >= 5) {
        return "yellow";
      } else if (animatedPercentage > 0) {
        return "red";
      } else {
        return "grey";
      }
    }
  };

  return (
    <div className={`ama gauge ${theme}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="37 -5 120 100"
        width="200"
        height="220"
        role="img"
        aria-label={screenReaderTitle || `${type === "100" ? animatedPercentage*10 + "%" : animatedPercentage}`}
      >
        <path
          className="grey"
          d="M55,90 A55,55 0 1,1 140,90"
          style={{ fill: "none" }}
        />
        <path
          className={`animated ${determineColorClass()}`}
          d="M55,90 A55,55 0 1,1 140,90"
          style={{
            fill: "none",
            strokeDasharray: 248,
            strokeDashoffset: calculateDashOffset(),
          }}
        />
        <text
          x="97"
          y="60"
          textAnchor="middle"
          fill="#333"
          className="ama-typography-display-6 bold element_title"
        >
          {type === "100" ? animatedPercentage*10 + "%" : animatedPercentage}
        </text>
        {title && title.map((text, index) => {
          return (
            <text
              x="97"
              y={`${index*15+80}`}
              textAnchor="middle"
              fill="#858585"
              fontSize="10"
              fontFamily="Lato"
            >
              {text}
            </text>
          )
        })}
      </svg>
    </div>
  );
};

export { Gauge };
