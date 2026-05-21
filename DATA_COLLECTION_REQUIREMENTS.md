# InsightsLake Data Collection Requirements

本文档说明后续还需要补充哪些信息，以及更干净、更可维护的数据文件应该满足哪些要求。目标是把公开工艺资料整理成可追溯、可计算、可筛选的数据资产，而不是只做一次性展示表。

## 还需要收集的信息

### 1. 工艺与节点基础信息

每条记录应明确：

- Foundry：例如 TSMC、Samsung Foundry、Intel Foundry、GlobalFoundries、SMIC、UMC。
- Process family：例如 N7 family、N5/N4 family、Intel 18A family。
- Process node：节点主名，例如 N5、N4P、Intel 3、SF4。
- Variant node：具体变体，例如 N5 HD、N3E 2-2 FinFlex、18A HP。
- Structure：Planar CMOS、FinFET、GAA / nanosheet、FD-SOI 等。
- Release / risk production / HVM timing：如果公开资料能确认，记录年份或季度。

### 2. 标准单元库几何信息

逻辑密度对库高度和 track 定义非常敏感，后续应优先收集：

- Library class：HD、HP、UHD、HPC、HDC、ULP/ULV、Balanced、Mixed 等归一化分类。
- Library option raw name：保留公开资料中的原始库名称。
- CPP / CGP nm。
- Cell height nm。
- Track count：例如 6T、7.5T、9T。
- Fin / nanosheet configuration：例如 2-fin、3-fin、2-1 FinFlex。
- Diffusion break model：SDB、DDB、CPODE、CNOD 等。
- Break extra CPP：用于密度公式的额外 CPP 假设。
- Formula source：区分官方数据、公开分析、反推估算、本站假设。

### 3. 逻辑密度信息

需要区分“公开报告值”和“本站计算值”：

- Logic density reported MTr/mm2：公开资料直接给出的值。
- Logic density calculated MTr/mm2：由几何参数计算得出的值。
- Density basis：NAND2 equivalent、million transistors per mm2、cell density、gate density 等。
- Density caveat：例如是否包含 SRAM、IO、analog、macro overhead。
- Calculation formula version：方便之后公式升级时重算。

### 4. SRAM 与存储宏信息

SRAM 密度应独立记录，避免和逻辑密度混用：

- SRAM bitcell area um2。
- SRAM ideal Mb/mm2。
- SRAM reported Mb/mm2。
- SRAM type：6T、8T、HD、HP、low-voltage、cache-oriented 等。
- SRAM source level：官方、论文、芯片实测、媒体整理、推断。
- Macro overhead assumption：如果从 bitcell 推宏密度，需要记录 overhead 口径。

### 5. 良率与制造信息

良率页面后续要更有价值，需要收集：

- Defect density D0：按节点、厂商、成熟度阶段记录。
- Yield model source：Poisson、Murphy、negative binomial 参数来源。
- Wafer diameter：200mm、300mm 等。
- Die dimensions：width mm、height mm，而不是只记录 area。
- Scribe lane / kerf width：切割道宽度，影响 gross die。
- Edge exclusion：晶圆边缘不可用宽度。
- Reticle limit：最大 reticle 尺寸、single reticle / stitched die。
- Parametric yield：如果有公开估计，需要和 random defect yield 分开。

### 6. BEOL、成本与封装上下文

这些字段不一定参与当前页面计算，但会影响工艺比较：

- Metal stack options：层数、pitch、top metal 选项。
- EUV layer count：如果公开可得。
- Wafer cost estimate：必须带年份、币种和来源。
- Mask cost / NRE：如果用于商业分析。
- Packaging compatibility：CoWoS、SoIC、Foveros、2.5D/3D 等。
- Power / performance claims：官方相对提升值，应记录 baseline。

## 更干净的数据文件要求

### 1. 拆分 raw、normalized、derived

建议不要把原始资料、清洗字段、计算结果全部塞进一个表。推荐三层：

- `raw_sources.csv`：原始来源索引，只保存来源、摘录、URL、日期、许可、可信度。
- `process_observations.csv`：规范化后的观测数据，一行代表一个“厂商 + 节点 + 变体 + 库选项”。
- `derived_metrics.csv`：由公式计算出的逻辑密度、SRAM 理想密度、良率示例等。

这样可以避免计算结果污染原始数据，也方便以后替换公式。

### 2. 每行必须有稳定 ID

建议字段：

- `record_id`：稳定唯一 ID，例如 `tsmc_n3e_2_2_finflex_hd_001`。
- `source_id`：链接到 `raw_sources.csv`。
- `formula_version`：如果是计算字段，记录公式版本。
- `created_at` / `updated_at`：数据维护时间。

### 3. 字段命名与单位固定

要求：

- 字段名使用 snake_case。
- 单位写入字段名，例如 `cpp_cgp_nm`、`cell_height_nm`、`sram_bitcell_um2`。
- 数值字段只放数字，不混入单位、约等号、范围说明。
- 范围值拆成 `min` / `typ` / `max`，不要写成 `"50-54"`。
- 缺失值保持空白或 `null`，不要混用 `N/A`、`-`、`unknown`。

### 4. 保留 raw value 与 normalized value

对容易产生解释差异的字段，建议成对保存：

- `library_class_raw` 与 `library_bucket`。
- `process_node_raw` 与 `process_node_normalized`。
- `confidence_raw` 与 `confidence_bucket`。
- `density_basis_raw` 与 `density_basis_normalized`。

页面筛选使用 normalized 字段，来源审计看 raw 字段。

### 5. 来源必须可追溯

每个非推导字段至少需要：

- `source_url`。
- `source_title`。
- `source_publisher`。
- `source_date`。
- `accessed_date`。
- `source_level`：official、paper、conference、teardown、media、aggregator、derived、assumption。
- `source_quote_or_note`：短摘录或说明，避免以后不知道为什么填这个值。

### 6. 置信度规则要可解释

建议把 confidence 拆成多个维度：

- `geometry_confidence`。
- `logic_density_confidence`。
- `sram_confidence`。
- `yield_confidence`。
- `overall_confidence`。

不要只用一个笼统的 confidence，因为同一条记录可能 SRAM 很可靠、逻辑几何很弱。

### 7. 计算字段必须可复现

所有 derived 字段应满足：

- 有明确输入字段。
- 有公式版本。
- 有是否采用 DDB/SDB 的说明。
- 有 rounding 规则。
- 有 `is_estimated` 标记。
- 有 `assumption_note`。

### 8. 数据质量校验

每次更新数据前应检查：

- `record_id` 唯一。
- 数值字段可解析为数字。
- 单位字段无混入文本单位。
- `source_id` 能在来源表中找到。
- 同一 foundry/node/library 的重复记录要么合并，要么用不同 variant 解释清楚。
- calculated density 与 reported density 差异超过阈值时标记 `review_required`。
- confidence 为空时禁止进入发布数据集。

## 建议的核心 CSV 字段

### `process_observations.csv`

| 字段 | 要求 |
| --- | --- |
| `record_id` | 必填，稳定唯一 |
| `foundry` | 必填 |
| `process_family` | 必填 |
| `process_node` | 必填 |
| `variant_node` | 必填 |
| `structure` | Planar / FinFET / GAA / FD-SOI 等 |
| `library_class_raw` | 来源原文 |
| `library_bucket` | 页面筛选用归一化分类 |
| `cpp_cgp_nm` | 数字 |
| `cell_height_nm` | 数字 |
| `track_count` | 可空 |
| `diffusion_break_model` | SDB / DDB / CPODE / CNOD 等 |
| `break_extra_cpp` | 数字，可空 |
| `logic_density_reported_mtr_mm2` | 数字，可空 |
| `sram_bitcell_um2` | 数字，可空 |
| `sram_reported_mb_mm2` | 数字，可空 |
| `geometry_confidence` | 必填 |
| `logic_density_confidence` | 必填 |
| `sram_confidence` | 可空但建议填 |
| `source_id` | 必填 |
| `notes` | 简短说明 |

### `derived_metrics.csv`

| 字段 | 要求 |
| --- | --- |
| `record_id` | 对应 process observation |
| `formula_version` | 必填 |
| `logic_density_calculated_mtr_mm2` | 数字，可复现 |
| `sram_ideal_mb_mm2` | 数字，可复现 |
| `calculation_inputs` | 输入字段摘要 |
| `assumption_note` | 公式假设 |
| `review_required` | true / false |

## 下一步优先级

1. 先建立 `raw_sources.csv` 和 `process_observations.csv`，把当前 CSV 拆成 raw / normalized 两层。
2. 给所有记录补 `record_id` 和 `source_id`。
3. 把 library class 做一次人工审核，固定 `library_bucket`。
4. 把 confidence 拆成 geometry / logic / SRAM 三个维度。
5. 为良率分析补充 die width、die height、scribe lane、edge exclusion、defect density 来源。
6. 最后再生成 `derived_metrics.csv`，由脚本统一计算逻辑密度和 SRAM 理想密度。
