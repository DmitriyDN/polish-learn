import React, { useState } from "react";
import { fetchData } from "../../services/api";
import { IWord } from "../../shared-interfaces/IWord";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import _ from "lodash";
import { wordColor, WordValid } from "../../services/wordProcessor";
import { mediaQueries } from "../../utils/mediaQueries";

const files = [
  "days.json",
  "kanapka1.json",
  "kanapka2.json",
  "kanapka3.json",
  "kanapka4.json",
  "kleks1.json",
  "kleks2.json",
  "months.json",
  "numbers.json",
];

export const ReviseWordsPage = () => {
  const [words, setWords] = useState<IWord[]>([]);
  const [inputVal, setInputVal] = useState<string>("");
  const [isValid, setIsValid] = useState<WordValid>(WordValid.PENDING);
  const [haveShown, setHaveShown] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState("");

  const getFile = (file: string) => {
    fetchData({
      url: `./words/${file}`,
    }).then((data: IWord[]) => {
      setWords(_.shuffle(data));
    });
  };

  React.useEffect(() => {
    if (files.length) {
      setCurrentFile(files[0]);
      getFile(files[0]);
    }
  }, []);

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputVal(ev.target.value);
  };

  if (!words || !words.length) {
    return (
      <Wrapper>
        <h1>LOADING....</h1>;
      </Wrapper>
    );
  }

  const validateWord = () => {
    if (inputVal.trim().toLowerCase() === words[0].pl.toLocaleLowerCase()) {
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

  const keyPressHandle = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.keyCode === 13) {
      if (isValid === WordValid.VALID) {
        validateWord();
        if (isValid === WordValid.VALID) {
          next();
        }
      } else {
        validateWord();
      }
    }
  };

  const changeFile = (file: SelectChangeEvent<string>) => {
    setCurrentFile(file.target.value);
    getFile(file.target.value);
  };

  return (
    <Wrapper>
      <Info>
        <Typography variant="h6" component="div" gutterBottom>
          Залишилось слів: {words.length}
        </Typography>
        <Select value={currentFile} onChange={changeFile}>
          {files.map((it, index) => (
            <MenuItem key={`value-${index}`} value={it}>
              {it}
            </MenuItem>
          ))}
        </Select>
      </Info>
      <Typography
        color={wordColor(isValid)}
        variant="h3"
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
          autoFocus={true}
          fullWidth={true}
          label="Відповідь"
          onChange={onChangeHandler}
          value={inputVal}
          onKeyDown={keyPressHandle}
        />
      </InputWrapper>
      <ButtonContainer>
        <Button onClick={validateWord}>Check</Button>
        <Button onClick={show}>Show</Button>
        <Button onClick={next}>Skip</Button>
        <Button onClick={next} disabled={isValid !== WordValid.VALID}>
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
  margin-top: 2rem;
  ${mediaQueries.mobile} {
    max-width: 90vw;
  }
`;
