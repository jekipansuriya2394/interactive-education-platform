import logoWhiteAsset from '../assets/logo-white.png';
import logoAsset from '../assets/logo.png';
import { adminData } from './adminData';

export const logoWhite = logoWhiteAsset;
export const logo = logoAsset;

export function getLogoUrl(isWhite = true) {
  try {
    const custom = adminData.getData('siteLogo');
    if (custom && typeof custom === 'string' && custom.trim().length > 0) {
      return custom;
    }
  } catch (e) {}
  return isWhite ? logoWhiteAsset : logoAsset;
}

