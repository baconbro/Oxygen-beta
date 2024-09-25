import styled from 'styled-components';

import { color, sizes, font, mixin, zIndexValues } from '../../shared/utils/styles';

export const Sidebar = styled.div`
  position: fixed;
  z-index: ${zIndexValues.navLeft - 1};
  top: 0;
  left: ${sizes.appNavBarLeftWidth}px;
  height: 100vh;
  width: ${sizes.secondarySideBarWidth}px;
  padding: 0 16px 24px;
  background: ${color.backgroundLightest};
  border-right: 1px solid ${color.borderLightest};
  ${mixin.scrollableY}
  ${mixin.customScrollbar()}
  @media (max-width: 1100px) {
    width: ${sizes.secondarySideBarWidth - 10}px;
  }
  @media (max-width: 999px) {
    display: none;
  }
`;

export const ProjectInfo = styled.div`
  display: flex;
  padding: 24px 4px;
`;

export const ProjectTexts = styled.div`
  padding: 3px 0 0 10px;
`;

export const ProjectName = styled.div`
  color: ${color.textDark};
  ${font.size(15)};
  ${font.medium};
`;

export const ProjectCategory = styled.div`
  color: ${color.textMedium};
  ${font.size(13)};
`;

export const Divider = styled.div`
  margin-top: 17px;
  padding-top: 18px;
  border-top: 1px solid ${color.borderLight};
`;

export const LinkItem = styled.div`
  
  ${mixin.clickable}
  ${props =>
    !props.to ? `cursor: not-allowed;` : `&:hover { background: ${color.backgroundLight}; }`}
    border-radius: 0.475rem;
  &.active {
    transition: color 0.2s ease, background-color 0.2s ease;
    background-color: #F3F6F9;
    color: #181C32;
  }
`;

export const LinkText = styled.div`

`;

export const NotImplemented = styled.div`
  display: inline-block;
  position: absolute;
  top: 7px;
  left: 40px;
  width: 140px;
  padding: 5px 0 5px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  color: ${color.textDark};
  background: ${color.backgroundMedium};
  opacity: 0;
  ${font.size(11.5)};
  ${font.bold}
  ${LinkItem}:hover & {
    opacity: 1;
  }
`;
