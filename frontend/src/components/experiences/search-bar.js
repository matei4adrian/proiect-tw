import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchBar = (props) => {
  const myOptions = [];
  const { experiences } = props;

  const getOptions = () => {
    experiences.forEach((experience) => {
      if (!myOptions.includes(experience.author)) {
        myOptions.push(experience.author);
      }
    });
  };

  const plm = (inputValue) => {
    const experienceCards = document.getElementsByClassName("experience-card");
    if (experienceCards.length > 0 && experienceCards) {
      for (const e of experienceCards) {
        if (
          !e.id.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        ) {
          e.classList.add("hidden");
        } else {
          e.classList.remove("hidden");
        }
      }
    }
  };

  const filteredExperiences = (inputValue) => {
    plm(inputValue);
    return experiences.filter((experience) =>
      experience.author.toLocaleLowerCase().includes(inputValue)
    );
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <div>
      <Autocomplete
        style={{ width: "35vh" }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => {
          filteredExperiences(params.inputProps.value);
          return (
            <TextField {...params} variant="outlined" label="Search here" />
          );
        }}
      />
    </div>
  );
};

export default SearchBar;
