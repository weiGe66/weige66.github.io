---
title: Python 虚拟环境与 pyproject.toml
createTime: 2026/11/23 14:57:00
permalink: /python/venv-and-pyproject/
---

接手一个 Python 后端时，我会先确认解释器路径。安装依赖成功，运行却报 `ModuleNotFoundError`，常见原因是终端、IDE 和测试命令使用了不同的 Python。学习工作台把运行依赖与 pytest、Ruff 等开发依赖分别写进 `pyproject.toml`，本地通过项目环境运行测试。

## 先确认命令跑在哪个解释器里

在 macOS 或 Linux 上，到 Python 项目所在目录运行以下命令。Windows 的虚拟环境解释器位于 `.venv\Scripts\python.exe`。

```bash
python3 --version
python3 -m venv .venv
.venv/bin/python -c 'import sys; print(sys.executable); print(sys.prefix != sys.base_prefix)'
.venv/bin/python -m pip --version
```

创建前先确认 `python3` 已满足项目的 `requires-python`。最后两行应显示虚拟环境解释器的路径、`True` 与同一环境下的 pip。直接指定 `.venv/bin/python` 时，运行不依赖当前终端是否激活环境。某些环境管理器默认不装 pip，此时按项目原有工具安装依赖，再用解释器路径检查测试进程。 [Python · venv](https://docs.python.org/3/library/venv.html)

## 配置各自管什么

```toml
[project]
name = "task-api"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = ["fastapi", "pydantic>=2,<3"]

[project.optional-dependencies]
dev = ["httpx", "pytest", "ruff"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

这是一个可打包项目的最小元数据示例，源代码可以放在 `task_api/` 包里，或按项目结构配置构建后端。部署所需的包放在 `dependencies`，测试与代码检查放在 `dev`。同时声明上限和下限可以表达兼容范围。需要团队与 CI 复用一组精确版本时，还要按项目选用的工具生成并提交锁文件或固定依赖清单。 [Python Packaging User Guide · pyproject.toml](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/)

项目可安装后，开发阶段可用下面这组命令。引号让 shell 把 `[dev]` 原样交给 pip。

```bash
.venv/bin/python -m pip install -e '.[dev]'
.venv/bin/python -m pytest -q
```

可编辑安装让已安装的包指向工作区源码，改 Python 文件后可以直接复跑测试。改依赖或入口点等元数据后应重新安装。发布前用干净环境做一次普通安装及运行检查，可以发现源码目录中有文件、构建产物却没带上的情况。 [pip · Local project installs](https://pip.pypa.io/en/stable/topics/local-project-installs/)
