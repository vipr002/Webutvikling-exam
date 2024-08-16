const url = "http://localhost:5132";
export const getImageUrl = (imageName: string) => {
  return `${url}/Images/${imageName}`;
};

export const getUrl = (target: string) => {
  return `${url}/api/${target}`;
};
