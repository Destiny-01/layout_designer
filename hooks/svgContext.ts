const getAbsolutePaths = async (subDir: string): Promise<string[]> => {
  // Dynamically import the SVG files
  const reqSvgs = await import(`!file-loader!../public/assets/tiles/${subDir}`);

  // Get the directory path of the context
  const contextDir: string = `/assets/tiles/${subDir}`;

  // Map each relative path to its absolute path
  // const absolutePaths: string[] = reqSvgs.default
  //   .keys()
  //   .map((path: string) => `${contextDir}/${path.replace('./', '')}`);

  // return absolutePaths;

  return [];
};

export default getAbsolutePaths;
