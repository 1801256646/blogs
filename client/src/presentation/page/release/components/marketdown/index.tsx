import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import abbreviation from 'markdown-it-abbr';
import deflist from 'markdown-it-deflist';
import emoji from 'markdown-it-emoji';
import footnote from 'markdown-it-footnote';
import insert from 'markdown-it-ins';
import mark from 'markdown-it-mark';
import subscript from 'markdown-it-sub';
import superscript from 'markdown-it-sup';
import tasklists from 'markdown-it-task-lists';
import React, { FC, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import { UploadFile } from '@/application/service/upload';
import 'highlight.js/styles/atom-one-light.css'
import 'react-markdown-editor-lite/lib/index.css';

const MarketDown: FC<{ setValue?: React.Dispatch<React.SetStateAction<string>> }> = ({ setValue }) => {
  const [_, setMdEditor] = useState<any>();
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str: string, lang: string) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (_) {}
      }
      return '';
    },
  }).use(emoji)
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    .use(tasklists, { enabled: tasklists });

  const handleChange = (params: { text: string, html: string }) => {
    setValue?.(params.text);
  };

  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    const data = await UploadFile(file);
    callback(data?.data?.url);
  };

  return (
    <MdEditor
      ref={node => setMdEditor(node)}
      renderHTML={(text) => mdParser.render(text)}
      style={{ height: '400px' }}
      config={{
        view: {
          menu: true,
          md: true,
          html: true,
        },
      }}
      onChange={handleChange}
      onImageUpload={handleImageUpload}
      placeholder='请输入你要发表的内容...'
    />
  );
};

export default MarketDown;
