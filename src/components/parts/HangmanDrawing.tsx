import React, { ReactElement } from 'react';

const top = (tries: number): ReactElement => (<div>_______</div>);
const rope = (tries: number): ReactElement => (<div>|/{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<span className={tries < 8 ? '' : 'visibility-hidden'}>|</span></div>);
const head = (tries: number): ReactElement => (<div>|{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<span className={ tries < 7 ? '' : 'visibility-hidden'}>(_)</span></div>);
const arms = (tries: number): ReactElement => (<div>|{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<span className={ tries < 5 ? '' : 'visibility-hidden'}>\</span><span className={ tries < 6 ? '' : 'visibility-hidden'}>|</span><span className={ tries < 4 ? '' : 'visibility-hidden'}>/</span></div>);
const torso = (tries: number): ReactElement => (<div>|{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<span className={ tries < 3 ? '' : 'visibility-hidden'}>|</span></div>);
const legs = (tries: number): ReactElement => (<div>|{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}<span className={ tries < 2 ? '' : 'visibility-hidden'}>/</span> <span className={ tries < 1 ? '' : 'visibility-hidden'}>\</span></div>);
const pillar = (tries: number): ReactElement => (<div>|</div>);
const base = (tries: number): ReactElement => (<div>|___</div>);

const HangmanDrawing = ({tries}: {tries: number}): ReactElement => (
  <div className="drawing">
    {top(tries)}
    {rope(tries)}
    {head(tries)}
    {arms(tries)}
    {torso(tries)}
    {legs(tries)}
    {pillar(tries)}
    {base(tries)}
  </div>
);

export default HangmanDrawing;