import React, { useState } from "react";
import { FETCH_URIS } from "../../data/fetchUris";
import { fetchData } from "../../services/api";
import { IWord } from "../../../../interfaces/IWord";
import { Button, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import _ from "lodash";
import { wordColor, WordValid } from "../../services/wordProcessor";

export const ReviseWordsPage = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [isValid, setIsValid] = useState<WordValid>(WordValid.PENDING);
  const [haveShown, setHaveShown] = useState<boolean>(false);
  React.useEffect(() => {
    fetchData({ url: FETCH_URIS.GET_ALL_WORDS }).then((data) => {
      setWords(_.shuffle(data));
    });
  }, []);

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputVal(ev.target.value.trim());
  };

  if (!words || !words.length) {
    return (
      <Wrapper>
        <h1>LOADING....</h1>;
      </Wrapper>
    );
  }

  const validateWord = () => {
    if (inputVal === words[0].pl) {
      setIsValid(WordValid.VALID);
    } else {
      setIsValid(WordValid.INVALID);
    }
  };

  const show = () => {
    setIsValid(WordValid.INVALID);
    setHaveShown(true);
  };

  const next = () => {
    if (words.length > 1) {
      setIsValid(WordValid.PENDING);
      setHaveShown(false);
      setInputVal("");
      setWords(words.slice(1));
    }
  };

  return (
    <Wrapper>
      <Info>
        <Typography variant="h6" component="div" gutterBottom>
          Залишилось слів: {words.length}
        </Typography>
      </Info>
      <Typography
        color={wordColor(isValid)}
        variant="h2"
        component="div"
        gutterBottom
      >
        {words[0].ua}
      </Typography>
      <Typography
        visibility={haveShown ? "visible" : "hidden"}
        variant="h4"
        component="div"
        gutterBottom
      >
        ({words[0].pl})
      </Typography>
      <InputWrapper>
        <TextField
          fullWidth={true}
          label="Відповідь"
          onChange={onChangeHandler}
          value={inputVal}
        />
      </InputWrapper>
      <ButtonContainer>
        <Button onClick={validateWord}>Check</Button>
        <Button onClick={show}>Show</Button>
        <Button
          onClick={next}
          disabled={!(isValid === WordValid.VALID || haveShown)}
        >
          Next
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

const Info = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  > * {
    margin: 0 2rem;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 50vw;
`;
