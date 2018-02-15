import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import balanceCircleLogo from '../assets/balance-circle-logo.svg';
import aragon from '../assets/tokens/aragon.svg';
import augur from '../assets/tokens/augur.svg';
import bat from '../assets/tokens/bat.svg';
import district0x from '../assets/tokens/district0x.svg';
import gnosis from '../assets/tokens/gnosis.svg';
import golem from '../assets/tokens/golem.svg';
import maker from '../assets/tokens/maker.svg';
import melonport from '../assets/tokens/melonport.svg';
import { colors, fonts, transitions, responsive } from '../styles';

const generateAnimation = ({ totalItems, pauseDuration, spinDuration, clockwise = true }) => {
  const items = (Array(totalItems).join('0') + '0').split('');
  const cycleDuration = pauseDuration + spinDuration;
  const totalDuration = cycleDuration * totalItems;
  const totalPercentage = 100;
  const cyclePercentage = totalPercentage / totalItems;
  const pausePercentage = pauseDuration / cycleDuration * cyclePercentage;
  const totalAngle = 360;
  const cycleAngle = totalAngle / totalItems;

  let animationString = items
    .map((item, index, arr) => {
      const cycleNumber = index + 1;
      const currentCyclePercentage = cycleNumber * cyclePercentage;

      const spinStartPercentage = currentCyclePercentage - cyclePercentage;
      const spinStopPercentage = currentCyclePercentage - pausePercentage - 0.01;
      const pauseStartPercentage = currentCyclePercentage - pausePercentage;
      const pauseStopPercentage = currentCyclePercentage - 0.01;

      const currentCycleAngle = cycleNumber * cycleAngle;
      const spinStartAngle = currentCycleAngle - cycleAngle;
      const spinStopAngle = currentCycleAngle;

      const direction = clockwise ? 1 : -1;

      return `
      ${spinStartPercentage}% {
        transform: rotate(${spinStartAngle * direction}deg);
      }
      ${spinStopPercentage}% {
        transform: rotate(${spinStopAngle * direction}deg);
      }
      ${pauseStartPercentage}% {
        transform: rotate(${spinStopAngle * direction}deg);
      }
      ${pauseStopPercentage}% {
        transform: rotate(${spinStopAngle * direction}deg);
      }
    `;
    })
    .join('');

  const animation = keyframes`${animationString}`;

  return `${animation} ${totalDuration}s ease infinite`;
};
const expandAnimation = (angle, circleSize) =>
  keyframes`
  0% {
    transform:
      rotate(${angle - 90}deg)
      translate(0)
      rotate(${-angle + 90}deg);
  }
  100% {
    transform:
    rotate(${angle}deg)
    translate(calc(${circleSize}px / 2))
    rotate(${-angle}deg)
  }
`;

const tokenList = [
  {
    name: 'Melonport',
    logo: melonport,
    description: 'Asset management',
    url: 'https://melonport.com'
  },
  {
    name: 'Golem',
    logo: golem,
    description: 'World computer',
    url: 'https://golem.io'
  },
  {
    name: 'Gnosis',
    logo: gnosis,
    description: 'Crowd insight',
    url: 'https://gnosis.pm'
  },
  {
    name: 'Aragon',
    logo: aragon,
    description: 'Governance tools',
    url: 'https://aragon.one'
  },
  {
    name: 'Basic Attention Token',
    logo: bat,
    description: 'Fair advertising',
    url: 'https://basicattentiontoken.org'
  },
  {
    name: 'District 0x',
    logo: district0x,
    description: 'Community tools',
    url: 'district0x.io'
  },
  {
    name: 'Augur',
    logo: augur,
    description: 'Prediction markets',
    url: 'augur.com'
  },
  {
    name: 'Maker',
    logo: maker,
    description: 'Stable $1 token',
    url: 'makerdao.com'
  }
];

const StyledWrapper = styled.div`
  width: ${({ circleSize, itemSize }) => `${circleSize + itemSize * 2}px`};
  height: ${({ circleSize, itemSize }) => `${circleSize + itemSize * 2}px`};
  ${'' /* overflow: hidden; */};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (${responsive.md.max}) {
    display: none;
  }
`;

const STokenDescription = styled.div`
  transition: ${transitions.base};
  opacity: 0;
  z-index: -1;
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  top: 0;
  left: 50%;
  right: auto;
  padding-left: 60%;
  padding-right: 0;
  text-align: left;
  border-radius: 0 8px 8px 0;
  font-size: ${fonts.small};
  color: rgb(${colors.white});
  background: rgb(39, 44, 51);
  & > div:first-of-type {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
    width: 130px;
    & > p:first-of-type {
      font-weight: 700;
      padding-bottom: 0.2em;
      margin-top: -0.2em;
    }
    & > p:last-of-type {
      font-size: ${fonts.tiny};
    }
  }
  & > div:last-of-type {
    height: 100%;
    border-radius: 0 8px 8px 0;
    background: rgb(74, 78, 83);
    display: flex;
    padding: 0 10px;
    align-items: center;
  }
`;

const STokenLogo = styled.div`
  display: block;
  position: absolute;
  width: ${({ itemSize }) => `${itemSize}px`};
  height: ${({ itemSize }) => `${itemSize}px`};
  top: 50%;
  left: 50%;
  margin: calc((40px / 2) * -1);
  animation: ${({ index, circleSize, totalItems }) => {
    const angle = index * (360 / totalItems);
    return `${expandAnimation(angle, circleSize)} 2s ease 1`;
  }};
  transform: ${({ index, circleSize, totalItems }) => {
    const angle = index * (360 / totalItems);
    return `rotate(${angle}deg)
      translate(calc(${circleSize}px / 2))
      rotate(${-angle}deg)`;
  }};
  &:hover {
    z-index: 10;
  }
`;

const STokenContent = styled.div`
  width: 100%;
  height: 100%;
  & img {
    width: 100%;
    height: 100%;
  }
  &:hover ${STokenDescription} {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
`;

const SInnerCircle = styled.img`
  position: absolute;
  width: ${({ circleSize }) => `${circleSize * 0.4}px`};
  height: ${({ circleSize }) => `${circleSize * 0.4}px`};
`;

const SOuterCircle = styled.div`
  position: relative;
  width: ${({ circleSize }) => `${circleSize}px`};
  height: ${({ circleSize }) => `${circleSize}px`};
  animation: ${({ totalItems, pauseDuration, spinDuration }) =>
    generateAnimation({ totalItems, pauseDuration, spinDuration, clockwise: true })};
  ${STokenContent} {
    animation: ${({ totalItems, pauseDuration, spinDuration }) =>
      generateAnimation({ totalItems, pauseDuration, spinDuration, clockwise: false })};
  }
  &:hover {
    z-index: 10;
  }
`;

class TokenAnimation extends Component {
  render() {
    return (
      <StyledWrapper circleSize={this.props.circleSize} itemSize={this.props.itemSize}>
        <SOuterCircle
          circleSize={this.props.circleSize}
          totalItems={this.props.tokens.length}
          pauseDuration={this.props.pauseDuration}
          spinDuration={this.props.spinDuration}
        >
          {this.props.tokens.map((token, index, arr) => (
            <STokenLogo
              index={index}
              totalItems={arr.length}
              circleSize={this.props.circleSize}
              itemSize={this.props.itemSize}
            >
              <STokenContent>
                <img src={token.logo} alt={token.name} />
                <STokenDescription>
                  <div>
                    <p>{token.name.toUpperCase()}</p>
                    <p>{token.description}</p>
                  </div>
                  <div>
                    <a href={token.url}>{token.url.replace(/(https?:\/\/)/g, '')}</a>
                  </div>
                </STokenDescription>
              </STokenContent>
            </STokenLogo>
          ))}
        </SOuterCircle>
        <SInnerCircle circleSize={this.props.circleSize} src={balanceCircleLogo} />
      </StyledWrapper>
    );
  }
}

TokenAnimation.propTypes = {
  circleSize: PropTypes.number,
  itemSize: PropTypes.number,
  tokens: PropTypes.array,
  pauseDuration: PropTypes.number,
  spinDuration: PropTypes.number
};

TokenAnimation.defaultProps = {
  circleSize: 450,
  itemSize: 50,
  tokens: tokenList,
  pauseDuration: 3,
  spinDuration: 1
};

export default TokenAnimation;
