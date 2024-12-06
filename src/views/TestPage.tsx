// import { useAppContext } from '../useAppContext';
import logo from '../../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// import { handleChange } from '../utils/core';
import GridComponent from '../components/grid';
import BoxComponent from '../components/box';
import GridComponent from '../components/grid';
import AvatarComponent from '../components/avatar';
import ButtonComponent from '../components/button';
import TextFieldComponent from '../components/textfield';
import TextComponent from '../components/typography';
import { useAppContext } from '../useAppContext';

export default function Test(): React.JSX.Element {
  const { translate } = useAppContext();

  return <GridComponent>{translate('test')}</GridComponent>;
}
