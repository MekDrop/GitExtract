function createCheckbox(name, id) {
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.name = name;
  return checkbox;
}

function createLabel(for_id, text) {
  let label = document.createElement('label');
  label.htmlFor = for_id;
  label.appendChild(
    document.createTextNode(
      text
    )
  );
  return label;
}

function createFolderLi(id, title, is_folder, path) {
  let el = document.createElement('li');
  el.id = id;
  el.className = is_folder ? 'folder' : 'file';
  let checkbox_id = 'checkbox:' + id;
  el.appendChild(
    createCheckbox('checkbox[' + path + ']', checkbox_id)
  );
  el.appendChild(
    createLabel(checkbox_id, title)
  );
  if (is_folder) {
    let ul = document.createElement('ul');
    el.appendChild(ul);
  }
  return el;
}

function getNewContainerNode(parent, path, is_folder, title) {
  let id = 'tree:' + (is_folder ? 'folder' : 'file') + ':' + path;
  let el = document.getElementById(id);
  if (!el) {
    el = createFolderLi(id, title, is_folder, path);
    parent.appendChild(el);
  }
  return el.querySelector('ul');
}

export default function (content, data) {
  content.innerHTML = '';
  let parent_list = document.createElement('ul')
  parent_list.className = 'files-tree';
  content.appendChild(parent_list);
  data
    .split("\n")
    .map(
      (file) => file.trim()
    )
    .filter(
      function (file) {
        return file && file.length > 0;
      }
    )
    .sort()
    .forEach(
      function (file) {
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
    );
}
