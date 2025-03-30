// src/utils/cookies.ts
export function getCookie(name: string): string | undefined {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : undefined;
  }
  