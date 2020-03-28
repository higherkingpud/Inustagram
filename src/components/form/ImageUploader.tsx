import * as React from 'react';
import PhotoIcon from '@material-ui/icons/Photo';

type Props = {
  defaultSrc?: string;
  image?: File;
  onChange: (image: File) => void;
};

export default ({
  defaultSrc,
  image,
  onChange,
}: Props): React.ReactElement => {
  const fileRef = React.useRef(null) as React.MutableRefObject<HTMLInputElement | null>;
  const onClick = React.useCallback(() => {
    if(!fileRef.current) { return; }
    fileRef.current.click();
  }, [fileRef]);
  const blobUrl = React.useMemo(() => {
    if(!image) { return undefined; }
    return URL.createObjectURL(image);
  }, [image]);
  React.useEffect(() => {
    if (!fileRef.current) {
      fileRef.current = document.createElement('input');
      fileRef.current.type = 'file';
      fileRef.current.accept = 'image/*';
      // eslint-disable-next-line
      fileRef.current.onchange = (event: any): void => {
        if (!event.target || !event.target.files[0]) { return; }
        onChange(event.target.files[0]);
        event.target.value = ''; // 同じファイルを選択した時もイベントが発火されるようにする
      };
    }
  }, [fileRef, onChange]);
  return (
    <>
      {blobUrl || defaultSrc
        ? <img
          className="flex"
          src={blobUrl ?? defaultSrc}
          onClick={onClick}
          width={360}
        />
        : <PhotoIcon
          className="flex img-icon"
          onClick={onClick}
        />
      }
      <style jsx>{`
        img {
          border-radius: 1rem;
          border: 2px solid #444;
          margin: auto;
          margin-bottom: 3rem;
        }
        :global(.img-icon.MuiSvgIcon-root) {
          display: flex;
          font-size: 15rem;
          margin: auto;
          margin-top: 1rem;
          margin-bottom: 3rem;
        }
      `}</style>
    </>
  );
};
