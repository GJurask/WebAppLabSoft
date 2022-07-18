namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SampleClass",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Identification = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Sample", "SampleClassId", c => c.Int(nullable: false));
            CreateIndex("dbo.Sample", "SampleClassId");
            AddForeignKey("dbo.Sample", "SampleClassId", "dbo.SampleClass", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sample", "SampleClassId", "dbo.SampleClass");
            DropIndex("dbo.Sample", new[] { "SampleClassId" });
            DropColumn("dbo.Sample", "SampleClassId");
            DropTable("dbo.SampleClass");
        }
    }
}
