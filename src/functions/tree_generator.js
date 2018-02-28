import 'jstree';

function createFolderLi(id, title, is_folder, path) {
  let el = $('<li></li>')
  el.attr('id', id);
  el.addClass(is_folder ? 'folder' : 'file');
  el.text(title);
  if (is_folder) {
    let ul = $('<ul></ul>');
    el.append(ul);
  }
  return el;
}

function getNewContainerNode(parent, path, is_folder, title) {
  let id = 'tree:' + (is_folder ? 'folder' : 'file') + ':' + path;
  let el = $('#' + id);
  if (!el.length) {
    el = createFolderLi(id, title, is_folder, path);
    parent.append(el);
  }
  return el.find('ul').first();
}

function prepareData(data) {
  return data
    .split("\n")
    .map(
      (file) => file.trim()
    )
    .filter(
      function (file) {
        return file && file.length > 0;
      }
    )
    .sort();
}

function addFileToTree(file, parent_list) {
  let parts = file.split('/');
  let parent = parent_list;
  for (let i = 0; i < parts.length; i++) {
    parent = getNewContainerNode(
      parent,
      parts.slice(0, i + 1).join('/'),
      i != parts.length - 1,
      parts[i]
    );
  }
}

export default function (content, data) {
  let cnt = $(content);
  cnt.html('');
  let parent_list = $('<ul class="files-tree"></ul>');
  cnt.append(parent_list);
  let files = prepareData(data);
  for (let i = 0; i < files.length; i++) {
    addFileToTree(files[i], parent_list);
  }
  parent_list.jstree({
    "core": {
      "themes": {
        "variant": "large"
      }
    },
    "checkbox": {
      "keep_selected_style": false
    },
    "plugins": ["wholerow", "checkbox"]
  });
}
