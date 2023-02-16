import { defineStore } from 'pinia';
import { getProject, postProject, delProject } from '/@/api/project';
import { Project, ProjectGroup } from '/@/api/models/project';
import { cloneDeep } from 'lodash-es';

interface ProjectState {
  allGroups: ProjectGroup[];
  selectedGroupId: string | number;
  draging: boolean;
}
export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    /* 分组数据 */
    allGroups: [],
    selectedGroupId: -1,
    draging: false,
  }),
  getters: {
    group(state) {
      const list = state.allGroups.flatMap((i) => i.children);
      return new ProjectGroup(-1, '全部应用', list);
    },
    selectGroup(state) {
      return state.allGroups.find((i) => i.id === +state.selectedGroupId);
    },
  },
  actions: {
    /* 获取分组 */
    async getProjectGroup() {
      const res = await getProject();
      res.map((i) => {
        i.children.map((j) => {
          j.groupId = i.id;
        });
      });
      this.allGroups = res;
    },
    /* 添加分组 */
    async addProjectGroup(data) {
      const res = await postProject(data);
      const newGroup = new ProjectGroup(res, data.name, []);
      this.allGroups.unshift(newGroup);
    },
    /* 删除分组 */
    async delProjectGroup(data) {
      await delProject(data);
      const index = this.allGroups.findIndex((i) => i.id === data.id);
      this.allGroups.splice(index, 1);
    },
    /* 移动 */
    move(pid, fromId, toId) {
      const form = this.allGroups.find((i) => i.id === fromId);
      const to = this.allGroups.find((i) => i.id === toId);
      if (form && to) {
        const idx = form.children.findIndex((i) => i.id === pid);
        const p = form.children.splice(idx, 1)[0];
        p.groupId = toId;
        to.children.push(p);
      }
    },
    /* 复制 */
    copy(val: Project) {
      const data = this.allGroups.find((i) => i.id === val.groupId);
      if (data) {
        const p = data.children.find((i) => i.id === val.id);
        const copy_p: any = cloneDeep(p);
        copy_p.id = Math.round(Math.random() * 1000);
        copy_p.name += '_copy';
        data.children.push(copy_p);
      }
    },
    /* 删除 */
    delete(val: Project) {
      const data = this.allGroups.find((i) => i.id === val.groupId);
      if (data) {
        data.children = data.children.filter((i) => i.id !== val.id);
      }
    },
  },
});
