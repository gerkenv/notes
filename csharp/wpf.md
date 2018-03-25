## WPF applications

Supported from .NET 3.0

### 1. XAML Templates

#### 1.1 Style Templates

##### 1.1.1 Style Template for Any Type of Element
A custom template can be defined in a scope of certain window:
```xml
<Window.Resources>
  <Style x:Key="CustomStyle">
    <Setter Property "Control.FontSize" Value="18" />
    <Setter Property "Control.Background" Value="Red" />
  </Style>
</Window.Resources>
```
Then a template can be applied in the same window scope for a certain element, we have an example with button, but this case it could be any kind of element which has properties `Background` and `Fontsize`:
```xml
<Grid>
  <Button Style="{StaticResource CustomStyle}" x:Name="button0" Content="Button" HorizontalAligment="Left" Margin="50, 50, 0, 0" VerticalAligment="Top" />
  <Button Style="{StaticResource CustomStyle}" x:Name="button1" Content="Button" HorizontalAligment="Left" Margin="100, 100, 0, 0" VerticalAligment="Top" />
</Grid>
```

##### 1.1.1 Style Template for a Certain Type of Elements
A template for a certain type of element can be defined using `x:Type` attribute and can be defined in a scope of certain window:
```xml
<Window.Resources>
  <Style x:Key="{x:Type Button}">
    <Setter Property "Control.FontSize" Value="18" />
    <Setter Property "Control.Background" Value="Red" />
  </Style>
</Window.Resources>
```
Then a template is automatically applied for all element of type `Button` in the same window scope:
```xml
<Grid>
  <Button x:Name="button0" Content="Button" HorizontalAligment="Left" Margin="50, 50, 0, 0" VerticalAligment="Top" />
  <Button x:Name="button1" Content="Button" HorizontalAligment="Left" Margin="100, 100, 0, 0" VerticalAligment="Top" />
</Grid>
```

#### MS Blend for VS
MS Blend helps to create any kinds of data templates with animations. It can be used as graphic designer in order to create a XAML element interpretation.

#### Custom Window Style
In order to create a custom style for a window we have to use a specific attrubutes - `WindowStyle` and `AllowTransparency`:
```xml
<Window x:Class="WpfApplication.MainWindow"
        xmlns=""
        Title="MainWindow" AllowTransparency="True" WindowStyle="None" Height="500" Width="700" >
```
Attribute `x:Class` defines default window code scope (namespace).


35:00
https://www.youtube.com/watch?v=F2ZkT58rGD8