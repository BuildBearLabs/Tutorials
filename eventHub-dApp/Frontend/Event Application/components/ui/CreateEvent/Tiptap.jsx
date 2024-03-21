import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({description, setDescription}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
        attributes: {
            class: 'rounded-md border min-h-[260px] border-input bg-background px-3 py-2 mt-10',
        }
    },
    onUpdate({editor}){
      setDescription(editor.getHTML())
      console.log(editor.getHTML());
    },
    content: 'Event description',
  })

  return (
      <EditorContent editor={editor} />
  )
}

export default Tiptap
