const FILE_EXTENSION_LIST = [".jpg", ".jpeg", ".png"];

const looksLikeFile = (path: string): boolean => {
  const comparisonPath = path.toLowerCase();
  for (const extension of FILE_EXTENSION_LIST) {
    if (comparisonPath.endsWith(extension)) {
      return true;
    }
  }

  return false;
};

const availableBackgrounds = (): string[] => {
  const recurseDirectory = (path: string): string[] => {
    const backgrounds: string[] = [];

    const pathContents = window.greeterutil.dirlist(path);
    if (pathContents === null) {
      return backgrounds;
    }

    for (const fileOrDirectory of pathContents) {
      // We don't actually have access to a filesystem, so we have to make
      // our best guess as to whether each item is a file or a directory.
      if (looksLikeFile(fileOrDirectory)) {
        backgrounds.push(fileOrDirectory);
      } else {
        backgrounds.push(...recurseDirectory(fileOrDirectory));
      }
    }

    return backgrounds;
  };

  return recurseDirectory(
    window.config.get_str("branding", "background_images")
  ).map((path) => "file://" + path);
};

export const selectBackground = (): string => {
  const backgrounds = availableBackgrounds();
  if (backgrounds.length === 0) {
    return "background.png";
  }

  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};
