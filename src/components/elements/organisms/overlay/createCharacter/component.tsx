/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Column,
  DoneOutlineIcon,
  FemaleIcon,
  FormControl,
  FormHelperText,
  InputLabel,
  LoadingButton,
  MaleIcon,
  MenuItem,
  Row,
  Select,
  Slider,
  TransgenderIcon,
  Typography,
} from '../../..';
import { useServerClient } from '../../../../../api/useServerClient';
import { CsEntityClass } from '../../../../../models/api.models';
import { CsEntityClassIconMap, CharacterRaceClassesMap } from '../../../../../models/character';
import { CharacterRace } from '../../../../../models/enums';
import { CreateCharacterResponseErrors } from '../../../../../models/response';
import { useNickname } from '../../../../../support/hooks';
import { isAnyEmpty } from '../../../../../support/utils';
import { RegisterInputField } from '../../../../pages/register/registerInputField';

export const CharacterCreation: React.FC<{ onCreated: () => void }> = ({ onCreated }) => {
  const { nickname, setNickname, isNicknameValid, nicknameErrorText } = useNickname(4, 20);
  const [characterRace, setCharacterRace] = useState(0);
  const [characterClass, setCharacterClass] = useState(0);
  const [availableCharacterClass, setAvailableCharacterClass] = useState<CsEntityClass[]>([]);
  const [gender, setGender] = useState(50);

  useEffect(() => {
    setCharacterClass(0);
    setAvailableCharacterClass(characterRace === 0 ? [] : CharacterRaceClassesMap[characterRace as CharacterRace]);
  }, [characterRace]);

  const initialErrors = {
    Nickname: [],
    CharacterClass: [],
    Gender: [],
    Creation: [],
  } as CreateCharacterResponseErrors;
  const [responseErrors, setResponseErrors] = useState<CreateCharacterResponseErrors>(initialErrors);
  const handleRaceChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
    setCharacterRace(event.target.value as number);
    setResponseErrors((prev) => ({ ...prev, CharacterRace: [] }));
  };

  const handleClassChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
    setCharacterClass(event.target.value as number);
    setResponseErrors((prev) => ({ ...prev, CharacterType: [] }));
  };

  const [invalid, setInvalid] = useState(true);
  useEffect(() => {
    setInvalid(isAnyEmpty(nickname) || !isNicknameValid || characterRace === 0 || characterClass === 0);
  }, [nickname, isNicknameValid, characterRace, characterClass]);

  const { createCharacter } = useServerClient();
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    if (isAnyEmpty(nickname) || !isNicknameValid || characterRace === 0 || characterClass === 0) {
      return;
    }
    setLoading(true);
    setResponseErrors(initialErrors);
    await createCharacter({ nickname, characterClass, gender })
      .then(() => {
        onCreated();
      })
      .catch((data) => {
        setResponseErrors(data?.response?.data?.errors);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Column
      sx={{
        width: '320px',
        paddingTop: 1,
        '& .MuiOutlinedInput-root': { '& fieldset': { transition: 'border 0.3s' } },
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
      }}
    >
      <RegisterInputField
        value={nickname}
        label="Nickname"
        autofocus
        onChange={(e): void => setNickname(e.target.value)}
        error={!isNicknameValid}
        errorText={nicknameErrorText}
        responseErrors={responseErrors?.Nickname}
      />
      <FormControl
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          margin: 1,
        }}
        required
        size="small"
      >
        <InputLabel id="race-select-label">Race</InputLabel>
        <Select
          labelId="race-select-label"
          value={characterRace}
          label="Race"
          onChange={handleRaceChange}
          MenuProps={{
            disableScrollLock: true,
            sx: {
              '& .MuiPopover-paper': {
                backgroundColor: (theme) => theme.palette.background.default,
              },
            },
          }}
        >
          <MenuItem value={0}>--Pick race--</MenuItem>
          <MenuItem value={1}>Divine</MenuItem>
          <MenuItem value={2}>Human</MenuItem>
          <MenuItem value={3}>Dwarf</MenuItem>
          <MenuItem value={4}>Orc</MenuItem>
          <MenuItem value={5}>NightElf</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          margin: 1,
        }}
        required
        error={responseErrors?.CharacterClass?.length > 0}
        size="small"
      >
        <InputLabel id="class-select-label">Class</InputLabel>
        <Select
          labelId="class-select-label"
          value={characterClass}
          label="Class"
          onChange={handleClassChange}
          renderValue={(v) => (
            <Row>
              {v === 0 && '--Pick type--'}
              <Box sx={{ marginRight: 1 }}>{CsEntityClassIconMap[v as CharacterRace]}</Box>
              {CsEntityClass[v as number]}
            </Row>
          )}
          MenuProps={{
            disableScrollLock: true,
            sx: {
              '& .MuiPopover-paper': {
                backgroundColor: (theme) => theme.palette.background.default,
              },
            },
          }}
        >
          <MenuItem value={0}>--Pick type--</MenuItem>
          {availableCharacterClass.map((acc, i) => (
            <MenuItem key={i} value={acc}>
              <Box sx={{ marginRight: 1 }}>{CsEntityClassIconMap[acc]}</Box>
              {CsEntityClass[acc]}
            </MenuItem>
          ))}
        </Select>
        {responseErrors?.CharacterClass?.length > 0 && <FormHelperText>Required</FormHelperText>}
      </FormControl>
      <Column
        sx={{
          width: 'calc(100% - 16px)',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        <Typography
          sx={{ marginRight: 'auto', marginLeft: '4px', color: (theme) => theme.palette.grey[700] }}
          variant="body1"
        >
          Phenotype:
        </Typography>
        <Row sx={{ justifyContent: 'space-between', margin: '0px 6px -11px 6px', width: 'calc(100% - 12px)' }}>
          <FemaleIcon sx={{ opacity: 0.6 }} />
          <TransgenderIcon sx={{ opacity: 0.6 }} />
          <MaleIcon sx={{ opacity: 0.6 }} />
        </Row>
        <Slider
          defaultValue={50}
          valueLabelDisplay="auto"
          color="secondary"
          sx={{
            width: '292px',
            marginBottom: 1,
            opacity: 0.75,
          }}
          onChange={(e, value) => setGender(value as number)}
        />
        {responseErrors?.Gender?.length > 0 && (
          <FormHelperText sx={{ color: (theme) => theme.palette.error.light, marginTop: '-16px' }}>Required</FormHelperText>
        )}
      </Column>
      {responseErrors?.Creation?.length > 0 &&
        responseErrors?.Creation.map((ce, i) => (
          <FormHelperText
            key={i}
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              borderRadius: 1,
              color: (theme) => theme.palette.error.light,
              textAlign: 'center',
            }}
          >
            {ce}
          </FormHelperText>
        ))}
      <LoadingButton
        onClick={onSubmit}
        icon={<DoneOutlineIcon />}
        sx={{ margin: 'auto', width: '302px', marginBottom: 1 }}
        caption="Create"
        disabled={invalid}
        loading={loading}
      />
    </Column>
  );
};
